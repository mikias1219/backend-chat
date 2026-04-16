import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RoomRole, RoomType } from '../../generated/prisma';
import { BearerAuthGuard } from '../../auth/bearer-auth.guard';
import { CurrentUser, type CurrentUserIdentity } from '../../auth/current-user';
import { RoomsService } from './rooms.service';
import { OkResponseDto } from '../dto/chat-api-response.dto';
import {
  AddRoomMembersRequestDto,
  CreateDmRequestDto,
  CreateRoomRequestDto,
  CreateRoomResponseDto,
  GetRoomResponseDto,
  ListUsersResponseDto,
  ListRoomsResponseDto,
  UpdateRoomMembersResponseDto,
  UpdateRoomRequestDto,
  UpdateRoomResponseDto,
} from '../dto/rooms.dto';

@ApiTags('chat-rooms', 'chat-channels', 'chat-direct')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('chat')
export class RoomsController {
  constructor(private readonly rooms: RoomsService) {}

  private async toRoomDto(
    room: {
      id: string;
      name: string;
      type: RoomType;
      directKey: string | null;
      createdAt: Date;
      updatedAt: Date;
      members: Array<{
        userId: string;
        role: RoomRole;
        user?: { name: string } | null;
      }>;
      messages?: Array<{
        id: string;
        body: string;
        createdAt: Date;
        userId: string;
        user: { name: string };
        attachments?: Array<{ id: string }>;
      }>;
    },
    userId: string,
  ) {
    return {
      id: room.id,
      name: room.name,
      type: room.type,
      directKey: room.directKey,
      createdAt: room.createdAt.toISOString(),
      updatedAt: room.updatedAt.toISOString(),
      memberUserIds: room.members.map((m) => m.userId),
      members: room.members.map((m) => ({
        userId: m.userId,
        name: m.user?.name ?? null,
        role: m.role,
      })),
      unreadCount: await this.rooms.getUnreadCount({
        roomId: room.id,
        userId,
      }),
      lastMessage: this.toLastMessage(room),
    };
  }

  private toLastMessage(room: {
    messages?: Array<{
      id: string;
      body: string;
      createdAt: Date;
      userId: string;
      user: { name: string };
      attachments?: Array<{ id: string }>;
    }>;
  }) {
    const last = room.messages?.[0];
    if (!last) return null;
    return {
      id: last.id,
      body: last.body,
      createdAt: last.createdAt.toISOString(),
      userId: last.userId,
      userName: last.user.name,
      hasAttachments: Boolean(last.attachments?.length),
    };
  }

  @Get('users')
  @ApiOperation({
    summary: 'List users available for direct messaging',
  })
  @ApiOkResponse({ type: ListUsersResponseDto })
  async listUsers(
    @CurrentUser() user: CurrentUserIdentity,
    @Query('q') q?: string,
  ): Promise<ListUsersResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const users = await this.rooms.listDirectoryUsers({
      excludeUserId: me.id,
      query: q,
    });
    const directRooms = await this.rooms.listRoomsForUser(
      me.id,
      RoomType.DIRECT,
    );
    const directRoomByPeer = new Map<string, string>();
    for (const room of directRooms) {
      if (room.type !== 'DIRECT') continue;
      const other = room.members.find((member) => member.userId !== me.id);
      if (other?.userId) directRoomByPeer.set(other.userId, room.id);
    }

    return {
      ok: true,
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email ?? '',
        directRoomId: directRoomByPeer.get(u.id) ?? null,
      })),
    };
  }

  @Get('rooms')
  @ApiExcludeEndpoint()
  @ApiOperation({
    summary: 'List rooms for the current user (with unread counts)',
  })
  @ApiOkResponse({ type: ListRoomsResponseDto })
  async listRooms(
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<ListRoomsResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });

    const rooms = await this.rooms.listRoomsForUser(me.id);
    const result = await Promise.all(
      rooms.map((r) => this.toRoomDto(r, me.id)),
    );

    return { ok: true, rooms: result };
  }

  @Get('channels')
  @ApiOperation({
    summary: 'List group channels for the current user',
  })
  @ApiOkResponse({ type: ListRoomsResponseDto })
  async listChannels(
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<ListRoomsResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const rooms = await this.rooms.listRoomsForUser(me.id, RoomType.GROUP);
    const result = await Promise.all(
      rooms.map((r) => this.toRoomDto(r, me.id)),
    );
    return { ok: true, rooms: result };
  }

  @Get('direct')
  @ApiOperation({
    summary: 'List private direct chats for the current user',
  })
  @ApiOkResponse({ type: ListRoomsResponseDto })
  async listDirect(
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<ListRoomsResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const rooms = await this.rooms.listRoomsForUser(me.id, RoomType.DIRECT);
    const result = await Promise.all(
      rooms.map((r) => this.toRoomDto(r, me.id)),
    );
    return { ok: true, rooms: result };
  }

  @Get('rooms/:roomId')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Get a single room the current user belongs to' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: GetRoomResponseDto })
  async getRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<GetRoomResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const r = await this.rooms.getRoomForUser(roomId, me.id);
    return {
      ok: true,
      room: await this.toRoomDto(r, me.id),
    };
  }

  @Get('channels/:channelId')
  @ApiOperation({ summary: 'Get one channel that the current user belongs to' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: GetRoomResponseDto })
  async getChannel(
    @Param('channelId') channelId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<GetRoomResponseDto> {
    return this.getRoom(channelId, user);
  }

  @Get('direct/:directId')
  @ApiOperation({
    summary: 'Get one private direct chat that the current user belongs to',
  })
  @ApiParam({ name: 'directId', required: true })
  @ApiOkResponse({ type: GetRoomResponseDto })
  async getDirect(
    @Param('directId') directId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<GetRoomResponseDto> {
    return this.getRoom(directId, user);
  }

  @Post('rooms/:roomId/join')
  @ApiExcludeEndpoint()
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
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.joinRoom({ roomId, userId: me.id });
    return { ok: true };
  }

  @Post('channels/:channelId/join')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Join channel (idempotent membership check for group channel)',
  })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async joinChannel(
    @Param('channelId') channelId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.joinRoom({ roomId: channelId, userId: me.id });
    return { ok: true };
  }

  @Post('direct/:directId/access')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Validate access to a private direct chat',
  })
  @ApiParam({ name: 'directId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async accessDirect(
    @Param('directId') directId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.requireMember(directId, me.id);
    return { ok: true };
  }

  @Post('rooms')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Create a group room' })
  @ApiOkResponse({ type: CreateRoomResponseDto })
  async createRoom(
    @Body() body: CreateRoomRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<CreateRoomResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
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
        members: [{ userId: me.id, name: me.name, role: 'OWNER' }],
        unreadCount: 0,
        lastMessage: null,
      },
    };
  }

  @Post('channels')
  @ApiOperation({ summary: 'Create a group channel' })
  @ApiOkResponse({ type: CreateRoomResponseDto })
  async createChannel(
    @Body() body: CreateRoomRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<CreateRoomResponseDto> {
    return this.createRoom(body, user);
  }

  @Post('dm')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create or get a direct room between me and another user',
  })
  @ApiOkResponse({ type: CreateRoomResponseDto })
  async createDm(
    @Body() body: CreateDmRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.requireRegisteredUser(body.otherUserId.trim(), {
      name: body.otherName,
      email: null,
    });
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
      role: m.role,
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
        lastMessage: withMembers ? this.toLastMessage(withMembers) : null,
      },
    };
  }

  @Post('direct')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create or get a private direct chat between me and another user',
  })
  @ApiOkResponse({ type: CreateRoomResponseDto })
  async createDirect(
    @Body() body: CreateDmRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.createDm(body, user);
  }

  @Patch('rooms/:roomId')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({ summary: 'Rename a group channel (owner only)' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: UpdateRoomResponseDto })
  async updateRoom(
    @Param('roomId') roomId: string,
    @Body() body: UpdateRoomRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<UpdateRoomResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const room = await this.rooms.updateGroupRoomName({
      roomId,
      actorUserId: me.id,
      name: body.name,
    });
    return { ok: true, room: await this.toRoomDto(room, me.id) };
  }

  @Patch('channels/:channelId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Rename a channel (owner only)' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: UpdateRoomResponseDto })
  async updateChannel(
    @Param('channelId') channelId: string,
    @Body() body: UpdateRoomRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<UpdateRoomResponseDto> {
    return this.updateRoom(channelId, body, user);
  }

  @Delete('rooms/:roomId')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a group channel (owner only)' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async deleteRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.deleteGroupRoom({ roomId, actorUserId: me.id });
    return { ok: true };
  }

  @Delete('channels/:channelId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a channel (owner only)' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async deleteChannel(
    @Param('channelId') channelId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.deleteRoom(channelId, user);
  }

  @Post('rooms/:roomId/members')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({ summary: 'Add members to a group channel (owner only)' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: UpdateRoomMembersResponseDto })
  async addMembers(
    @Param('roomId') roomId: string,
    @Body() body: AddRoomMembersRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<UpdateRoomMembersResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const room = await this.rooms.addGroupMembers({
      roomId,
      actorUserId: me.id,
      userIds: body.userIds,
    });
    return { ok: true, room: await this.toRoomDto(room, me.id) };
  }

  @Post('channels/:channelId/members')
  @HttpCode(200)
  @ApiOperation({ summary: 'Add people to a channel (owner only)' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: UpdateRoomMembersResponseDto })
  async addChannelMembers(
    @Param('channelId') channelId: string,
    @Body() body: AddRoomMembersRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<UpdateRoomMembersResponseDto> {
    return this.addMembers(channelId, body, user);
  }

  @Delete('rooms/:roomId/members/:memberId')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Remove a member from a group channel (owner only)',
  })
  @ApiParam({ name: 'roomId', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiOkResponse({ type: UpdateRoomMembersResponseDto })
  async removeMember(
    @Param('roomId') roomId: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<UpdateRoomMembersResponseDto> {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const room = await this.rooms.removeGroupMember({
      roomId,
      actorUserId: me.id,
      targetUserId: memberId,
    });
    return { ok: true, room: await this.toRoomDto(room, me.id) };
  }

  @Delete('channels/:channelId/members/:memberId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove a person from a channel (owner only)' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiOkResponse({ type: UpdateRoomMembersResponseDto })
  async removeChannelMember(
    @Param('channelId') channelId: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<UpdateRoomMembersResponseDto> {
    return this.removeMember(channelId, memberId, user);
  }

  @Post('rooms/:roomId/leave')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({ summary: 'Leave a group channel' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async leaveRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.leaveGroupRoom({ roomId, userId: me.id });
    return { ok: true };
  }

  @Post('channels/:channelId/leave')
  @HttpCode(200)
  @ApiOperation({ summary: 'Leave a channel' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async leaveChannel(
    @Param('channelId') channelId: string,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.leaveRoom(channelId, user);
  }
}
