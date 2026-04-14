import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { MessagesService } from '../messages/messages.service';
import { JoinRoomDto } from '../dto/join-room.dto';
import { SendMessageDto } from '../dto/send-message.dto';

type ClientMeta = {
  userId?: string;
  userName?: string;
  email?: string;
};

type TypingPayload = {
  roomId: string;
  isTyping: boolean;
};

type AckPayload = {
  roomId: string;
  messageId: string;
};

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL?.split(',') ?? true,
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly rooms: RoomsService,
    private readonly messages: MessagesService,
  ) {}

  private readonly userIdsByRoom = new Map<string, Set<string>>();
  private readonly typingByRoom = new Map<string, Set<string>>();

  private decodeJwt(token: string): Record<string, unknown> | null {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const padded = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '=');
    const b64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    try {
      const json = Buffer.from(b64, 'base64').toString('utf8');
      return JSON.parse(json) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  private getMeta(socket: Socket): ClientMeta {
    const raw = socket.data?.meta;
    return (raw ?? {}) as ClientMeta;
  }

  private setMeta(socket: Socket, meta: ClientMeta) {
    socket.data.meta = meta;
  }

  private ensureIdentity(socket: Socket) {
    const meta = this.getMeta(socket);
    if (meta.userId) return;

    const token = socket.handshake.auth?.token;
    if (typeof token === 'string' && token.length > 0) {
      const claims = this.decodeJwt(token);
      const userId =
        (claims?.sub as string | undefined) ??
        (claims?.userId as string | undefined) ??
        (claims?.id as string | undefined);
      const userName = (claims?.name as string | undefined) ?? (claims?.userName as string | undefined);
      const email = (claims?.email as string | undefined) ?? undefined;

      this.setMeta(socket, {
        ...meta,
        userId: userId ?? `token:${token.slice(0, 12)}`,
        userName,
        email,
      });
      return;
    }

    this.setMeta(socket, {
      ...meta,
      userId: `anon:${crypto.randomUUID().slice(0, 8)}`,
      userName: meta.userName ?? 'Anonymous',
    });
  }

  @SubscribeMessage('chat:join')
  async onJoin(@MessageBody() body: JoinRoomDto, @ConnectedSocket() socket: Socket) {
    if (!body?.roomId) return { ok: false, error: 'roomId is required' };

    this.ensureIdentity(socket);
    const meta = this.getMeta(socket);
    const user = await this.rooms.ensureUser({
      id: meta.userId,
      name: meta.userName,
      email: meta.email ?? null,
    });
    await this.rooms.joinRoom({ roomId: body.roomId, userId: user.id });

    await socket.join(body.roomId);

    const set = this.userIdsByRoom.get(body.roomId) ?? new Set<string>();
    set.add(user.id);
    this.userIdsByRoom.set(body.roomId, set);
    this.server.to(body.roomId).emit('presence:update', { userIds: Array.from(set) });

    socket.emit('chat:recent', {
      roomId: body.roomId,
      messages: await this.messages.getRecent({ roomId: body.roomId }),
    });

    return { ok: true };
  }

  @SubscribeMessage('chat:leave')
  async onLeave(@MessageBody() body: Pick<JoinRoomDto, 'roomId'>, @ConnectedSocket() socket: Socket) {
    if (!body?.roomId) return { ok: false, error: 'roomId is required' };
    await socket.leave(body.roomId);

    const { userId } = this.getMeta(socket);
    const set = this.userIdsByRoom.get(body.roomId);
    if (userId && set) {
      set.delete(userId);
      if (set.size === 0) this.userIdsByRoom.delete(body.roomId);
      this.server.to(body.roomId).emit('presence:update', { userIds: Array.from(set) });
    }
    return { ok: true };
  }

  @SubscribeMessage('chat:send')
  async onMessage(@MessageBody() body: SendMessageDto, @ConnectedSocket() socket: Socket) {
    if (!body?.roomId || (!body?.body && !(body.attachmentIds?.length ?? 0))) {
      return { ok: false, error: 'roomId and body (or attachments) are required' };
    }

    this.ensureIdentity(socket);
    const meta = this.getMeta(socket);
    const user = await this.rooms.ensureUser({
      id: meta.userId,
      name: meta.userName,
      email: meta.email ?? null,
    });
    await this.rooms.joinRoom({ roomId: body.roomId, userId: user.id });

    const saved = await this.messages.createMessage({
      roomId: body.roomId,
      userId: user.id,
      body: body.body ?? '',
      replyToId: body.replyToId,
      attachmentIds: body.attachmentIds,
    });

    this.server.to(body.roomId).emit('chat:message', saved);
    return { ok: true, message: saved };
  }

  @SubscribeMessage('chat:typing')
  async onTyping(@MessageBody() body: TypingPayload, @ConnectedSocket() socket: Socket) {
    if (!body?.roomId) return { ok: false, error: 'roomId is required' };
    this.ensureIdentity(socket);
    const meta = this.getMeta(socket);
    const userId = meta.userId;
    if (!userId) return { ok: false, error: 'userId not available' };

    const set = this.typingByRoom.get(body.roomId) ?? new Set<string>();
    if (body.isTyping) set.add(userId);
    else set.delete(userId);
    if (set.size === 0) this.typingByRoom.delete(body.roomId);
    else this.typingByRoom.set(body.roomId, set);

    socket.to(body.roomId).emit('chat:typing', { roomId: body.roomId, userIds: Array.from(set) });
    return { ok: true };
  }

  @SubscribeMessage('chat:ack:delivered')
  async onDelivered(@MessageBody() body: AckPayload, @ConnectedSocket() socket: Socket) {
    if (!body?.roomId || !body?.messageId) return { ok: false, error: 'roomId and messageId are required' };
    this.ensureIdentity(socket);
    const { userId } = this.getMeta(socket);
    if (!userId) return { ok: false, error: 'userId not available' };

    await this.messages.markDelivered({ roomId: body.roomId, messageId: body.messageId, userId });
    this.server.to(body.roomId).emit('chat:message:delivered', { roomId: body.roomId, messageId: body.messageId, userId });
    return { ok: true };
  }

  @SubscribeMessage('chat:ack:read')
  async onRead(@MessageBody() body: AckPayload, @ConnectedSocket() socket: Socket) {
    if (!body?.roomId || !body?.messageId) return { ok: false, error: 'roomId and messageId are required' };
    this.ensureIdentity(socket);
    const { userId } = this.getMeta(socket);
    if (!userId) return { ok: false, error: 'userId not available' };

    await this.messages.markRead({ roomId: body.roomId, messageId: body.messageId, userId });
    // Also update unread tracking (best-effort)
    await this.rooms.markRoomRead({ roomId: body.roomId, userId, upToMessageId: body.messageId }).catch(() => undefined);

    this.server.to(body.roomId).emit('chat:message:read', { roomId: body.roomId, messageId: body.messageId, userId });
    return { ok: true };
  }
}

