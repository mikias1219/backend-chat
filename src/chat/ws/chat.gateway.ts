import { HttpException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { identityFromBearer } from '../../auth/jwt-lite';
import { ChatCoordinatorService } from '../chat-coordinator.service';
import { JoinRoomDto } from '../dto/join-room.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { ChatEventsService } from './chat-events.service';

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
  // Production defaults: allow polling fallback but keep sane timeouts.
  pingInterval: Number(process.env.SOCKET_PING_INTERVAL_MS ?? 25000),
  pingTimeout: Number(process.env.SOCKET_PING_TIMEOUT_MS ?? 20000),
  maxHttpBufferSize: Number(
    process.env.SOCKET_MAX_HTTP_BUFFER_BYTES ?? 1_000_000,
  ), // 1MB
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly coordinator: ChatCoordinatorService,
    private readonly events: ChatEventsService,
  ) {}

  afterInit() {
    this.events.attachServer(this.server);
  }

  private socketRequireAuth(): boolean {
    // In production you almost always want this true.
    return (
      (process.env.SOCKET_REQUIRE_AUTH ?? 'true').toLowerCase() !== 'false'
    );
  }

  private socketAllowAnon(): boolean {
    // Useful for local demos only. If REQUIRE_AUTH is true, this is ignored.
    return (process.env.SOCKET_ALLOW_ANON ?? 'false').toLowerCase() === 'true';
  }

  private getMeta(socket: Socket): ClientMeta {
    const raw = socket.data?.meta;
    return (raw ?? {}) as ClientMeta;
  }

  private setMeta(socket: Socket, meta: ClientMeta) {
    socket.data.meta = meta;
  }

  private async ensureIdentity(socket: Socket) {
    const meta = this.getMeta(socket);
    if (meta.userId) return;

    const token = socket.handshake.auth?.token;
    if (typeof token === 'string' && token.length > 0) {
      const identity = await identityFromBearer(`Bearer ${token}`);
      const userId = identity?.userId;
      const userName = identity?.name;
      const email = identity?.email;

      this.setMeta(socket, {
        ...meta,
        userId,
        userName,
        email,
      });
      return;
    }

    if (this.socketRequireAuth() && !this.socketAllowAnon()) {
      throw new HttpException('Unauthorized (missing token)', 401);
    }

    this.setMeta(socket, {
      ...meta,
      userId: meta.userId ?? `anon:${crypto.randomUUID().slice(0, 8)}`,
      userName: meta.userName ?? 'Anonymous',
    });
  }

  @SubscribeMessage('chat:join')
  async onJoin(
    @MessageBody() body: JoinRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    if (!body?.roomId) return { ok: false, error: 'roomId is required' };

    try {
      await this.ensureIdentity(socket);
    } catch (e) {
      if (e instanceof HttpException) return { ok: false, error: e.message };
      return { ok: false, error: 'unauthorized' };
    }
    const meta = this.getMeta(socket);
    if (!meta.userId) return { ok: false, error: 'Unauthorized' };
    await this.coordinator.joinSocketRoom({
      socket,
      roomId: body.roomId,
      identity: {
        userId: meta.userId!,
        name: meta.userName,
        email: meta.email ?? null,
      },
    });

    return { ok: true };
  }

  @SubscribeMessage('chat:leave')
  async onLeave(
    @MessageBody() body: Pick<JoinRoomDto, 'roomId'>,
    @ConnectedSocket() socket: Socket,
  ) {
    if (!body?.roomId) return { ok: false, error: 'roomId is required' };
    const { userId } = this.getMeta(socket);
    await this.coordinator.leaveSocketRoom({
      socket,
      roomId: body.roomId,
      userId,
    });
    return { ok: true };
  }

  @SubscribeMessage('chat:send')
  async onMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    if (!body?.roomId) {
      return { ok: false, error: 'roomId is required' };
    }

    try {
      await this.ensureIdentity(socket);
    } catch (e) {
      if (e instanceof HttpException) return { ok: false, error: e.message };
      return { ok: false, error: 'unauthorized' };
    }
    const meta = this.getMeta(socket);
    if (!meta.userId) return { ok: false, error: 'Unauthorized' };

    try {
      const message = await this.coordinator.sendMessage({
        roomId: body.roomId,
        identity: {
          userId: meta.userId!,
          name: meta.userName,
          email: meta.email ?? null,
        },
        body: body.body,
        replyToId: body.replyToId,
        attachmentIds: body.attachmentIds,
      });
      return { ok: true, message, clientId: body.clientId };
    } catch (e) {
      if (e instanceof HttpException) {
        return { ok: false, error: e.message };
      }
      const err = e as { message?: string };
      return { ok: false, error: err?.message ?? 'send failed' };
    }
  }

  @SubscribeMessage('chat:typing')
  async onTyping(
    @MessageBody() body: TypingPayload,
    @ConnectedSocket() socket: Socket,
  ) {
    if (!body?.roomId) return { ok: false, error: 'roomId is required' };
    try {
      await this.ensureIdentity(socket);
    } catch (e) {
      if (e instanceof HttpException) return { ok: false, error: e.message };
      return { ok: false, error: 'unauthorized' };
    }
    const meta = this.getMeta(socket);
    const userId = meta.userId;
    if (!userId) return { ok: false, error: 'userId not available' };

    try {
      await this.coordinator.broadcastTypingFromSocket({
        socket,
        roomId: body.roomId,
        userId,
        isTyping: body.isTyping,
      });
      return { ok: true };
    } catch (e) {
      if (e instanceof HttpException) return { ok: false, error: e.message };
      return { ok: false, error: 'typing failed' };
    }
  }

  @SubscribeMessage('chat:ack:delivered')
  async onDelivered(
    @MessageBody() body: AckPayload,
    @ConnectedSocket() socket: Socket,
  ) {
    if (!body?.roomId || !body?.messageId)
      return { ok: false, error: 'roomId and messageId are required' };
    try {
      await this.ensureIdentity(socket);
    } catch (e) {
      if (e instanceof HttpException) return { ok: false, error: e.message };
      return { ok: false, error: 'unauthorized' };
    }
    const { userId } = this.getMeta(socket);
    if (!userId) return { ok: false, error: 'userId not available' };

    await this.coordinator.markDeliveredAndEmit({
      roomId: body.roomId,
      messageId: body.messageId,
      userId,
    });
    return { ok: true };
  }

  @SubscribeMessage('chat:ack:read')
  async onRead(
    @MessageBody() body: AckPayload,
    @ConnectedSocket() socket: Socket,
  ) {
    if (!body?.roomId || !body?.messageId)
      return { ok: false, error: 'roomId and messageId are required' };
    try {
      await this.ensureIdentity(socket);
    } catch (e) {
      if (e instanceof HttpException) return { ok: false, error: e.message };
      return { ok: false, error: 'unauthorized' };
    }
    const { userId } = this.getMeta(socket);
    if (!userId) return { ok: false, error: 'userId not available' };

    await this.coordinator.markReadAndEmit({
      roomId: body.roomId,
      messageId: body.messageId,
      userId,
    });
    return { ok: true };
  }
}
