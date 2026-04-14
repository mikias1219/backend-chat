import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BearerAuthGuard } from '../../auth/bearer-auth.guard';
import { CurrentUser, type CurrentUserIdentity } from '../../auth/current-user';
import { RoomsService } from '../rooms/rooms.service';
import { MessagesService } from './messages.service';
import { ChatMessageDto } from '../dto/chat-message.dto';
import { MarkReadRequestDto } from '../dto/mark-read.dto';

@ApiTags('chat-messages')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('chat')
export class MessagesController {
  constructor(
    private readonly rooms: RoomsService,
    private readonly messages: MessagesService,
  ) {}

  @Get('rooms/:roomId/messages')
  @ApiOperation({ summary: 'List recent messages in a room' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: [ChatMessageDto] })
  async getRoomMessages(
    @Param('roomId') roomId: string,
    @Query('limit') limit?: string,
    @CurrentUser() user?: CurrentUserIdentity,
  ): Promise<ChatMessageDto[]> {
    // Ensure membership (dev-friendly)
    if (user) {
      const me = await this.rooms.ensureUser({ id: user.userId, name: user.name, email: user.email ?? null });
      await this.rooms.joinRoom({ roomId, userId: me.id });
    }
    const parsed = limit ? Number(limit) : undefined;
    const safeLimit = Number.isFinite(parsed) ? Math.max(1, Math.min(200, parsed!)) : 50;
    return this.messages.getRecent({ roomId, limit: safeLimit }) as unknown as ChatMessageDto[];
  }

  @Post('rooms/:roomId/read')
  @ApiOperation({ summary: 'Mark room as read up to a message (or now)' })
  @ApiParam({ name: 'roomId', required: true })
  async markRead(
    @Param('roomId') roomId: string,
    @Body() body: MarkReadRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.ensureUser({ id: user.userId, name: user.name, email: user.email ?? null });
    await this.rooms.joinRoom({ roomId, userId: me.id });
    await this.rooms.markRoomRead({ roomId, userId: me.id, upToMessageId: body.upToMessageId });
    return { ok: true };
  }
}

