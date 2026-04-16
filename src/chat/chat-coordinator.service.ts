import { BadRequestException, Injectable } from '@nestjs/common';
import type { Socket } from 'socket.io';
import { RoomsService } from './rooms/rooms.service';
import { MessagesService, type MessageOut } from './messages/messages.service';
import { ChatEventsService } from './ws/chat-events.service';
import { ChatRoomStateService } from './ws/chat-room-state.service';

export type ChatUserIdentity = {
  userId: string;
  name?: string;
  email?: string | null;
};

@Injectable()
export class ChatCoordinatorService {
  constructor(
    private readonly rooms: RoomsService,
    private readonly messages: MessagesService,
    private readonly events: ChatEventsService,
    private readonly roomState: ChatRoomStateService,
  ) {}

  private assertHasContent(body?: string, attachmentIds?: string[]) {
    const hasText = Boolean(body?.trim());
    const hasFiles = Boolean(attachmentIds?.length);
    if (!hasText && !hasFiles) {
      throw new BadRequestException(
        'Message must include text and/or attachments',
      );
    }
  }

  async joinSocketRoom(params: {
    socket: Socket;
    roomId: string;
    identity: ChatUserIdentity;
  }): Promise<{ userIds: string[]; recent: MessageOut[] }> {
    const user = await this.rooms.requireRegisteredUser(
      params.identity.userId,
      {
        name: params.identity.name,
        email: params.identity.email ?? null,
      },
    );
    await this.rooms.joinRoom({ roomId: params.roomId, userId: user.id });
    await params.socket.join(params.roomId);

    const userIds = this.roomState.trackJoined(params.roomId, user.id);
    this.events.emitToRoom(params.roomId, 'presence:update', { userIds });

    const recent = await this.messages.listMessages({ roomId: params.roomId });
    params.socket.emit('chat:recent', {
      roomId: params.roomId,
      messages: recent,
    });
    return { userIds, recent };
  }

  async leaveSocketRoom(params: {
    socket: Socket;
    roomId: string;
    userId?: string;
  }) {
    await params.socket.leave(params.roomId);
    const next = this.roomState.trackLeft(params.roomId, params.userId);
    if (next)
      this.events.emitToRoom(params.roomId, 'presence:update', {
        userIds: next,
      });
  }

  /**
   * Persist + broadcast a message. Callers must have already joined the room (WS) or be a member (REST).
   */
  async sendMessage(params: {
    roomId: string;
    identity: ChatUserIdentity;
    body?: string;
    replyToId?: string;
    attachmentIds?: string[];
  }): Promise<MessageOut> {
    this.assertHasContent(params.body, params.attachmentIds);
    await this.rooms.requireMember(params.roomId, params.identity.userId);

    const user = await this.rooms.requireRegisteredUser(
      params.identity.userId,
      {
        name: params.identity.name,
        email: params.identity.email ?? null,
      },
    );

    const saved = await this.messages.createMessage({
      roomId: params.roomId,
      userId: user.id,
      body: params.body ?? '',
      replyToId: params.replyToId,
      attachmentIds: params.attachmentIds,
    });

    this.events.emitToRoom(params.roomId, 'chat:message', saved);
    return saved;
  }

  async broadcastTypingFromSocket(params: {
    socket: Socket;
    roomId: string;
    userId: string;
    isTyping: boolean;
  }) {
    await this.rooms.requireMember(params.roomId, params.userId);
    const userIds = this.roomState.setTyping(
      params.roomId,
      params.userId,
      params.isTyping,
    );
    params.socket
      .to(params.roomId)
      .emit('chat:typing', { roomId: params.roomId, userIds });
  }

  async broadcastTypingFromHttp(params: {
    roomId: string;
    userId: string;
    isTyping: boolean;
  }) {
    await this.rooms.requireMember(params.roomId, params.userId);
    const userIds = this.roomState.setTyping(
      params.roomId,
      params.userId,
      params.isTyping,
    );
    this.events.emitToRoom(params.roomId, 'chat:typing', {
      roomId: params.roomId,
      userIds,
    });
  }

  async markDeliveredAndEmit(params: {
    roomId: string;
    messageId: string;
    userId: string;
  }) {
    await this.rooms.requireMember(params.roomId, params.userId);
    await this.messages.markDelivered({
      roomId: params.roomId,
      messageId: params.messageId,
      userId: params.userId,
    });
    this.events.emitToRoom(params.roomId, 'chat:message:delivered', {
      roomId: params.roomId,
      messageId: params.messageId,
      userId: params.userId,
    });
  }

  async markReadAndEmit(params: {
    roomId: string;
    messageId: string;
    userId: string;
  }) {
    await this.rooms.requireMember(params.roomId, params.userId);
    await this.messages.markRead({
      roomId: params.roomId,
      messageId: params.messageId,
      userId: params.userId,
    });
    await this.rooms
      .markRoomRead({
        roomId: params.roomId,
        userId: params.userId,
        upToMessageId: params.messageId,
      })
      .catch(() => undefined);
    this.events.emitToRoom(params.roomId, 'chat:message:read', {
      roomId: params.roomId,
      messageId: params.messageId,
      userId: params.userId,
    });
  }
}
