import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BearerAuthGuard } from '../../auth/bearer-auth.guard';
import { CurrentUser, type CurrentUserIdentity } from '../../auth/current-user';
import { RoomsService } from './rooms.service';
import {
  CreateDmRequestDto,
  CreateRoomRequestDto,
  CreateRoomResponseDto,
  ListRoomsResponseDto,
} from '../dto/rooms.dto';

@ApiTags('chat-rooms')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('chat')
export class RoomsController {
  constructor(private readonly rooms: RoomsService) {}

  @Get('rooms')
  @ApiOperation({ summary: 'List rooms for the current user (with unread counts)' })
  @ApiOkResponse({ type: ListRoomsResponseDto })
  async listRooms(@CurrentUser() user: CurrentUserIdentity): Promise<ListRoomsResponseDto> {
    const me = await this.rooms.ensureUser({
      id: user.userId,
      name: user.name,
      email: user.email ?? null,
    });

    const rooms = await this.rooms.listRoomsForUser(me.id);
    const result = await Promise.all(
      rooms.map(async (r) => ({
        id: r.id,
        name: r.name,
        type: r.type,
        directKey: r.directKey,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        memberUserIds: r.members.map((m) => m.userId),
        members: r.members.map((m) => ({ userId: m.userId, name: m.user?.name ?? null })),
        unreadCount: await this.rooms.getUnreadCount({ roomId: r.id, userId: me.id }),
      })),
    );

    return { ok: true, rooms: result };
  }

  @Post('rooms')
  @ApiOperation({ summary: 'Create a group room' })
  @ApiOkResponse({ type: CreateRoomResponseDto })
  async createRoom(
    @Body() body: CreateRoomRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<CreateRoomResponseDto> {
    const me = await this.rooms.ensureUser({
      id: user.userId,
      name: user.name,
      email: user.email ?? null,
    });
    const room = await this.rooms.createGroupRoom({ id: body.id, name: body.name.trim(), ownerId: me.id });

    return {
      ok: true,
      room: {
        id: room.id,
        name: room.name,
        type: room.type,
        directKey: room.directKey,
        createdAt: room.createdAt.toISOString(),
        updatedAt: room.updatedAt.toISOString(),
        memberUserIds: [me.id],
        members: [{ userId: me.id, name: me.name }],
        unreadCount: 0,
      },
    };
  }

  @Post('dm')
  @ApiOperation({ summary: 'Create or get a direct room between me and another user' })
  async createDm(@Body() body: CreateDmRequestDto, @CurrentUser() user: CurrentUserIdentity) {
    const me = await this.rooms.ensureUser({
      id: user.userId,
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.ensureUser({ id: body.otherUserId.trim(), name: body.otherName, email: null });
    const room = await this.rooms.ensureDirectRoom({ userA: me.id, userB: body.otherUserId.trim() });
    const withMembers = await this.rooms.listRoomsForUser(me.id).then((list) => list.find((r) => r.id === room.id));
    const members = (withMembers?.members ?? []).map((m) => ({ userId: m.userId, name: m.user?.name ?? null }));
    return {
      ok: true,
      room: {
        id: room.id,
        name: room.name,
        type: room.type,
        directKey: room.directKey,
        createdAt: room.createdAt.toISOString(),
        updatedAt: room.updatedAt.toISOString(),
        memberUserIds: members.map((m) => m.userId),
        members,
        unreadCount: 0,
      },
    };
  }
}

