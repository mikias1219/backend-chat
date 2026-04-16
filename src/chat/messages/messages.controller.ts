import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BearerAuthGuard } from '../../auth/bearer-auth.guard';
import { CurrentUser, type CurrentUserIdentity } from '../../auth/current-user';
import { ChatCoordinatorService } from '../chat-coordinator.service';
import { ChatMessageDto } from '../dto/chat-message.dto';
import {
  OkResponseDto,
  PostChatMessageResponseDto,
} from '../dto/chat-api-response.dto';
import { CreateChatMessageDto } from '../dto/create-chat-message.dto';
import { ListMessagesQueryDto } from '../dto/list-messages-query.dto';
import { MarkReadRequestDto } from '../dto/mark-read.dto';
import { ReceiptRequestDto } from '../dto/receipt-request.dto';
import { TypingRequestDto } from '../dto/typing-request.dto';
import { RoomsService } from '../rooms/rooms.service';
import { MessagesService } from './messages.service';

@ApiTags('chat-messages', 'chat-channels', 'chat-direct')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('chat')
export class MessagesController {
  constructor(
    private readonly rooms: RoomsService,
    private readonly messages: MessagesService,
    private readonly coordinator: ChatCoordinatorService,
  ) {}

  @Get('rooms/:roomId/messages')
  @ApiExcludeEndpoint()
  @ApiOperation({
    summary: 'List messages in a room (cursor pagination: before / after)',
  })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: [ChatMessageDto] })
  async getRoomMessages(
    @Param('roomId') roomId: string,
    @Query() query: ListMessagesQueryDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<ChatMessageDto[]> {
    if (query.before && query.after) {
      throw new BadRequestException('Use only one of before or after');
    }
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.requireMember(roomId, me.id);
    const parsed = query.limit;
    const safeLimit = Number.isFinite(parsed) ? parsed! : 50;
    return this.messages.listMessages({
      roomId,
      limit: safeLimit,
      beforeMessageId: query.before,
      afterMessageId: query.after,
    }) as unknown as ChatMessageDto[];
  }

  @Get('channels/:channelId/messages')
  @ApiOperation({
    summary: 'List messages in a channel (cursor pagination: before / after)',
  })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: [ChatMessageDto] })
  async getChannelMessages(
    @Param('channelId') channelId: string,
    @Query() query: ListMessagesQueryDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<ChatMessageDto[]> {
    return this.getRoomMessages(channelId, query, user);
  }

  @Get('direct/:directId/messages')
  @ApiOperation({
    summary: 'List messages in a private direct chat (cursor pagination)',
  })
  @ApiParam({ name: 'directId', required: true })
  @ApiOkResponse({ type: [ChatMessageDto] })
  async getDirectMessages(
    @Param('directId') directId: string,
    @Query() query: ListMessagesQueryDto,
    @CurrentUser() user: CurrentUserIdentity,
  ): Promise<ChatMessageDto[]> {
    return this.getRoomMessages(directId, query, user);
  }

  @Post('rooms/:roomId/messages')
  @ApiExcludeEndpoint()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Send a message (broadcasts over Socket.IO as chat:message)',
  })
  @ApiParam({ name: 'roomId', required: true })
  @ApiCreatedResponse({ type: PostChatMessageResponseDto })
  async postRoomMessage(
    @Param('roomId') roomId: string,
    @Body() body: CreateChatMessageDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    const message = await this.coordinator.sendMessage({
      roomId,
      identity: { userId: me.id, name: me.name, email: me.email },
      body: body.body,
      replyToId: body.replyToId,
      attachmentIds: body.attachmentIds,
    });
    return { ok: true, message };
  }

  @Post('channels/:channelId/messages')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Send a message to a channel',
  })
  @ApiParam({ name: 'channelId', required: true })
  @ApiCreatedResponse({ type: PostChatMessageResponseDto })
  async postChannelMessage(
    @Param('channelId') channelId: string,
    @Body() body: CreateChatMessageDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postRoomMessage(channelId, body, user);
  }

  @Post('direct/:directId/messages')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Send a message to a private direct chat',
  })
  @ApiParam({ name: 'directId', required: true })
  @ApiCreatedResponse({ type: PostChatMessageResponseDto })
  async postDirectMessage(
    @Param('directId') directId: string,
    @Body() body: CreateChatMessageDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postRoomMessage(directId, body, user);
  }

  @Post('rooms/:roomId/typing')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({ summary: 'Typing indicator (HTTP mirror of chat:typing)' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postTyping(
    @Param('roomId') roomId: string,
    @Body() body: TypingRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    await this.coordinator.broadcastTypingFromHttp({
      roomId,
      userId: user.userId,
      isTyping: body.isTyping,
    });
    return { ok: true };
  }

  @Post('channels/:channelId/typing')
  @HttpCode(200)
  @ApiOperation({ summary: 'Channel typing indicator' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postChannelTyping(
    @Param('channelId') channelId: string,
    @Body() body: TypingRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postTyping(channelId, body, user);
  }

  @Post('direct/:directId/typing')
  @HttpCode(200)
  @ApiOperation({ summary: 'Direct chat typing indicator' })
  @ApiParam({ name: 'directId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postDirectTyping(
    @Param('directId') directId: string,
    @Body() body: TypingRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postTyping(directId, body, user);
  }

  @Post('rooms/:roomId/receipts/delivered')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Mark a message delivered for the current user (HTTP mirror of chat:ack:delivered)',
  })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postDelivered(
    @Param('roomId') roomId: string,
    @Body() body: ReceiptRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    await this.rooms.requireMember(roomId, user.userId);
    await this.coordinator.markDeliveredAndEmit({
      roomId,
      messageId: body.messageId,
      userId: user.userId,
    });
    return { ok: true };
  }

  @Post('channels/:channelId/receipts/delivered')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Mark channel message delivered',
  })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postChannelDelivered(
    @Param('channelId') channelId: string,
    @Body() body: ReceiptRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postDelivered(channelId, body, user);
  }

  @Post('direct/:directId/receipts/delivered')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Mark direct message delivered',
  })
  @ApiParam({ name: 'directId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postDirectDelivered(
    @Param('directId') directId: string,
    @Body() body: ReceiptRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postDelivered(directId, body, user);
  }

  @Post('rooms/:roomId/receipts/read')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Mark a message read for the current user (HTTP mirror of chat:ack:read)',
  })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postReadReceipt(
    @Param('roomId') roomId: string,
    @Body() body: ReceiptRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    await this.rooms.requireMember(roomId, user.userId);
    await this.coordinator.markReadAndEmit({
      roomId,
      messageId: body.messageId,
      userId: user.userId,
    });
    return { ok: true };
  }

  @Post('channels/:channelId/receipts/read')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Mark channel message read',
  })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postChannelReadReceipt(
    @Param('channelId') channelId: string,
    @Body() body: ReceiptRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postReadReceipt(channelId, body, user);
  }

  @Post('direct/:directId/receipts/read')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Mark direct message read',
  })
  @ApiParam({ name: 'directId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async postDirectReadReceipt(
    @Param('directId') directId: string,
    @Body() body: ReceiptRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.postReadReceipt(directId, body, user);
  }

  @Post('rooms/:roomId/read')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({ summary: 'Mark room as read up to a message (or now)' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async markRead(
    @Param('roomId') roomId: string,
    @Body() body: MarkReadRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.requireMember(roomId, me.id);
    await this.rooms.markRoomRead({
      roomId,
      userId: me.id,
      upToMessageId: body.upToMessageId,
    });
    return { ok: true };
  }

  @Post('channels/:channelId/read')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mark channel as read up to a message (or now)' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async markChannelRead(
    @Param('channelId') channelId: string,
    @Body() body: MarkReadRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.markRead(channelId, body, user);
  }

  @Post('direct/:directId/read')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Mark direct chat as read up to a message (or now)',
  })
  @ApiParam({ name: 'directId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async markDirectRead(
    @Param('directId') directId: string,
    @Body() body: MarkReadRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.markRead(directId, body, user);
  }
}
