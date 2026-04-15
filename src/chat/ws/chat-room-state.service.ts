import { Injectable } from '@nestjs/common';

/**
 * In-memory presence + typing aggregates per room (Socket.IO rooms are transport; this is app state).
 */
@Injectable()
export class ChatRoomStateService {
  private readonly userIdsByRoom = new Map<string, Set<string>>();
  private readonly typingByRoom = new Map<string, Set<string>>();

  trackJoined(roomId: string, userId: string): string[] {
    const set = this.userIdsByRoom.get(roomId) ?? new Set<string>();
    set.add(userId);
    this.userIdsByRoom.set(roomId, set);
    return Array.from(set);
  }

  trackLeft(roomId: string, userId: string | undefined): string[] | null {
    if (!userId) return null;
    const set = this.userIdsByRoom.get(roomId);
    if (!set) return null;
    set.delete(userId);
    if (set.size === 0) this.userIdsByRoom.delete(roomId);
    return Array.from(set);
  }

  setTyping(roomId: string, userId: string, isTyping: boolean): string[] {
    const set = this.typingByRoom.get(roomId) ?? new Set<string>();
    if (isTyping) set.add(userId);
    else set.delete(userId);
    if (set.size === 0) this.typingByRoom.delete(roomId);
    else this.typingByRoom.set(roomId, set);
    return Array.from(set);
  }
}
