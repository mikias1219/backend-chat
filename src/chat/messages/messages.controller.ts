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

@ApiTags('chat-messages')
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
    const me = await this.rooms.requireRegisteredUser(user.userId);
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

  @Post('rooms/:roomId/messages')
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
    const me = await this.rooms.requireRegisteredUser(user.userId);
    const message = await this.coordinator.sendMessage({
      roomId,
      identity: { userId: me.id, name: me.name, email: me.email },
      body: body.body,
      replyToId: body.replyToId,
      attachmentIds: body.attachmentIds,
    });
    return { ok: true, message };
  }

  @Post('rooms/:roomId/typing')
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

  @Post('rooms/:roomId/receipts/delivered')
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

  @Post('rooms/:roomId/receipts/read')
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

  @Post('rooms/:roomId/read')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mark room as read up to a message (or now)' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiOkResponse({ type: OkResponseDto })
  async markRead(
    @Param('roomId') roomId: string,
    @Body() body: MarkReadRequestDto,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    const me = await this.rooms.requireRegisteredUser(user.userId);
    await this.rooms.requireMember(roomId, me.id);
    await this.rooms.markRoomRead({
      roomId,
      userId: me.id,
      upToMessageId: body.upToMessageId,
    });
    return { ok: true };
  }
}
