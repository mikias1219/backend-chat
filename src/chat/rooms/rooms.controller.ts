import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BearerAuthGuard } from '../../auth/bearer-auth.guard';
import { CurrentUser, type CurrentUserIdentity } from '../../auth/current-user';
import { RoomsService } from './rooms.service';
import { OkResponseDto } from '../dto/chat-api-response.dto';
import {
  CreateDmRequestDto,
  CreateRoomRequestDto,
  CreateRoomResponseDto,
  GetRoomResponseDto,
  ListRoomsResponseDto,
} from '../dto/rooms.dto';

@ApiTags('chat-rooms')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('chat')
export class RoomsController {
  constructor(private readonly rooms: RoomsService) {}

  @Get('rooms')
  @ApiOperation({
    summary: 'List rooms for the current user (with unread counts)',
  })
  @ApiOkResponse({ type: ListRoomsResponseDto })
  async listRooms(
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<ListRoomsResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId);

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
        members: r.members.map((m) => ({
          userId: m.userId,
          name: m.user?.name ?? null,
        })),
        unreadCount: await this.rooms.getUnreadCount({
          roomId: r.id,
          userId: me.id,
        }),
      })),
    );

    return { ok: true, rooms: result };
  }

  @Get('rooms/:roomId')
  @ApiOperation({ summary: 'Get a single room the current user belongs to' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: GetRoomResponseDto })
  async getRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<GetRoomResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId);
    const r = await this.rooms.getRoomForUser(roomId, me.id);
    const members = r.members.map((m) => ({
      userId: m.userId,
      name: m.user?.name ?? null,
    }));
    return {
      ok: true,
      room: {
        id: r.id,
        name: r.name,
        type: r.type,
        directKey: r.directKey,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        memberUserIds: members.map((m) => m.userId),
        members,
        unreadCount: await this.rooms.getUnreadCount({
          roomId: r.id,
          userId: me.id,
        }),
      },
    };
  }

  @Post('rooms/:roomId/join')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Join a room (idempotent). Required before REST messaging on open groups.',
  })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async joinRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId);
    await this.rooms.joinRoom({ roomId, userId: me.id });
    return { ok: true };
  }

  @Post('rooms')
  @ApiOperation({ summary: 'Create a group room' })
  @ApiOkResponse({ type: CreateRoomResponseDto })
  async createRoom(
    @Body() body: CreateRoomRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<CreateRoomResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId);
    const room = await this.rooms.createGroupRoom({
      id: body.id,
      name: body.name.trim(),
      ownerId: me.id,
    });

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
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create or get a direct room between me and another user',
  })
  @ApiOkResponse({ type: CreateRoomResponseDto })
  async createDm(
    @Body() body: CreateDmRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId);
    await this.rooms.requireRegisteredUser(body.otherUserId.trim());
    const room = await this.rooms.ensureDirectRoom({
      userA: me.id,
      userB: body.otherUserId.trim(),
    });
    const withMembers = await this.rooms
      .listRoomsForUser(me.id)
      .then((list) => list.find((r) => r.id === room.id));
    const members = (withMembers?.members ?? []).map((m) => ({
      userId: m.userId,
      name: m.user?.name ?? null,
    }));
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
