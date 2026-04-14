import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomType } from '../../generated/prisma';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async ensureUser(params: { id?: string; name?: string; email?: string | null }) {
    const name = params.name?.trim() || 'Anonymous';
    const email = params.email?.trim() || null;

    if (params.id) {
      return this.prisma.user.upsert({
        where: { id: params.id },
        update: { name, ...(email ? { email } : {}) },
        create: { id: params.id, name, email },
      });
    }

    if (email) {
      return this.prisma.user.upsert({
        where: { email },
        update: { name },
        create: { email, name },
      });
    }

    return this.prisma.user.create({ data: { name } });
  }

  async ensureRoom(params: { id: string; name: string; type: RoomType; directKey?: string | null }) {
    return this.prisma.room.upsert({
      where: { id: params.id },
      update: { name: params.name, type: params.type, directKey: params.directKey ?? null },
      create: { id: params.id, name: params.name, type: params.type, directKey: params.directKey ?? null },
    });
  }

  async joinRoom(params: { roomId: string; userId: string }) {
    await this.ensureRoom({
      id: params.roomId,
      name: params.roomId,
      type: params.roomId.startsWith('dm:') ? RoomType.DIRECT : RoomType.GROUP,
      directKey: null,
    });

    await this.prisma.roomMember.upsert({
      where: { roomId_userId: { roomId: params.roomId, userId: params.userId } },
      update: {},
      create: { roomId: params.roomId, userId: params.userId },
    });
  }

  async listRoomsForUser(userId: string) {
    return this.prisma.room.findMany({
      where: { members: { some: { userId } } },
      orderBy: { updatedAt: 'desc' },
      include: { members: { include: { user: true } } },
    });
  }

  async createGroupRoom(params: { id?: string; name: string; ownerId: string }) {
    const roomId = params.id ?? crypto.randomUUID();
    const room = await this.ensureRoom({ id: roomId, name: params.name, type: RoomType.GROUP, directKey: null });
    await this.joinRoom({ roomId: room.id, userId: params.ownerId });
    return room;
  }

  async ensureDirectRoom(params: { userA: string; userB: string }) {
    const [a, b] = [params.userA, params.userB].sort();
    const directKey = `${a}:${b}`;
    const existing = await this.prisma.room.findUnique({ where: { directKey } });
    if (existing) return existing;

    return this.prisma.room.create({
      data: {
        name: 'Direct message',
        type: RoomType.DIRECT,
        directKey,
        members: { create: [{ userId: a }, { userId: b }] },
      },
    });
  }

  async markRoomRead(params: { roomId: string; userId: string; upToMessageId?: string }) {
    const membership = await this.prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId: params.roomId, userId: params.userId } },
    });
    if (!membership) throw new NotFoundException('Not a room member');

    let lastReadAt = new Date();
    let lastReadMessageId = params.upToMessageId ?? null;

    if (params.upToMessageId) {
      const msg = await this.prisma.message.findUnique({ where: { id: params.upToMessageId } });
      if (!msg || msg.roomId !== params.roomId) throw new NotFoundException('Message not found in room');
      lastReadAt = msg.createdAt;
      lastReadMessageId = msg.id;
    }

    await this.prisma.roomMember.update({
      where: { roomId_userId: { roomId: params.roomId, userId: params.userId } },
      data: { lastReadAt, lastReadMessageId },
    });
  }

  async getUnreadCount(params: { roomId: string; userId: string }) {
    const membership = await this.prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId: params.roomId, userId: params.userId } },
    });
    if (!membership) return 0;
    return this.prisma.message.count({
      where: {
        roomId: params.roomId,
        userId: { not: params.userId },
        createdAt: membership.lastReadAt ? { gt: membership.lastReadAt } : undefined,
      },
    });
  }
}

