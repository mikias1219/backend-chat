import { Injectable } from '@nestjs/common';
import type { Server } from 'socket.io';

/**
 * Thin bridge so REST controllers and the WebSocket gateway share the same Socket.IO broadcast surface.
 */
@Injectable()
export class ChatEventsService {
  private server: Server | null = null;

  attachServer(server: Server) {
    this.server = server;
  }

  emitToRoom(roomId: string, event: string, payload: unknown) {
    this.server?.to(roomId).emit(event, payload);
  }

  /** Emit to everyone in a room except one socket (typing indicators, etc.). */
  emitToRoomExcept(
    socketId: string,
    roomId: string,
    event: string,
    payload: unknown,
  ) {
    this.server?.to(roomId).except(socketId).emit(event, payload);
  }
}
