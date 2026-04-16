import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, RoomRole, RoomType } from '../../generated/prisma';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async requireRegisteredUser(
    userId: string,
    defaults?: { name?: string; email?: string | null },
  ) {
    let user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      user = await this.ensureUser({
        id: userId,
        name: defaults?.name,
        email: defaults?.email ?? null,
      });
      return user;
    }

    const nextName = defaults?.name?.trim();
    const nextEmail = defaults?.email?.trim();
    if ((nextName && nextName !== user.name) || (nextEmail && !user.email)) {
      user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(nextName ? { name: nextName } : {}),
          ...(nextEmail && !user.email ? { email: nextEmail } : {}),
        },
      });
    }

    return user;
  }

  async ensureUser(params: {
    id?: string;
    name?: string;
    email?: string | null;
  }) {
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

  async ensureRoom(params: {
    id: string;
    name: string;
    type: RoomType;
    directKey?: string | null;
  }) {
    return this.prisma.room.upsert({
      where: { id: params.id },
      update: {
        name: params.name,
        type: params.type,
        directKey: params.directKey ?? null,
      },
      create: {
        id: params.id,
        name: params.name,
        type: params.type,
        directKey: params.directKey ?? null,
      },
    });
  }

  async requireMember(roomId: string, userId: string) {
    const membership = await this.prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) throw new ForbiddenException('Not a room member');
    return membership;
  }

  private async requireGroupRoom(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { id: true, type: true },
    });
    if (!room) throw new NotFoundException('Room not found');
    if (room.type !== RoomType.GROUP) {
      throw new ForbiddenException('Only group channels can be managed');
    }
    return room;
  }

  private async requireGroupOwner(roomId: string, userId: string) {
    await this.requireGroupRoom(roomId);
    const membership = await this.requireMember(roomId, userId);
    if (membership.role !== RoomRole.OWNER) {
      throw new ForbiddenException(
        'Only channel owners can perform this action',
      );
    }
    return membership;
  }

  private async getRoomWithDetails(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        members: { include: { user: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            user: true,
            attachments: { select: { id: true } },
          },
        },
      },
    });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async getRoomForUser(roomId: string, userId: string) {
    await this.requireMember(roomId, userId);
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        members: { include: { user: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            user: true,
            attachments: { select: { id: true } },
          },
        },
      },
    });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async joinRoom(params: { roomId: string; userId: string; role?: RoomRole }) {
    const room = await this.prisma.room.findUnique({
      where: { id: params.roomId },
      select: { id: true },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (!params.role) {
      await this.requireMember(params.roomId, params.userId);
      return;
    }

    await this.prisma.roomMember.upsert({
      where: {
        roomId_userId: { roomId: params.roomId, userId: params.userId },
      },
      update: params.role ? { role: params.role } : {},
      create: {
        roomId: params.roomId,
        userId: params.userId,
        role: params.role ?? RoomRole.MEMBER,
      },
    });
  }

  async listRoomsForUser(userId: string, type?: RoomType) {
    return this.prisma.room.findMany({
      where: {
        members: { some: { userId } },
        ...(type ? { type } : {}),
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        members: { include: { user: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            user: true,
            attachments: { select: { id: true } },
          },
        },
      },
    });
  }

  async listDirectoryUsers(params: { excludeUserId: string; query?: string }) {
    const search = params.query?.trim();
    const where: Prisma.UserWhereInput = {
      id: { not: params.excludeUserId },
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true },
      orderBy: [{ name: 'asc' }, { email: 'asc' }],
      take: 200,
    });
  }

  async createGroupRoom(params: {
    id?: string;
    name: string;
    ownerId: string;
  }) {
    const roomId = params.id ?? crypto.randomUUID();
    const room = await this.ensureRoom({
      id: roomId,
      name: params.name,
      type: RoomType.GROUP,
      directKey: null,
    });
    await this.joinRoom({
      roomId: room.id,
      userId: params.ownerId,
      role: RoomRole.OWNER,
    });
    return room;
  }

  async ensureDirectRoom(params: { userA: string; userB: string }) {
    const [a, b] = [params.userA, params.userB].sort();
    const directKey = `${a}:${b}`;
    const existing = await this.prisma.room.findUnique({
      where: { directKey },
    });
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

  async markRoomRead(params: {
    roomId: string;
    userId: string;
    upToMessageId?: string;
  }) {
    const membership = await this.prisma.roomMember.findUnique({
      where: {
        roomId_userId: { roomId: params.roomId, userId: params.userId },
      },
    });
    if (!membership) throw new NotFoundException('Not a room member');

    let lastReadAt = new Date();
    let lastReadMessageId = params.upToMessageId ?? null;

    if (params.upToMessageId) {
      const msg = await this.prisma.message.findUnique({
        where: { id: params.upToMessageId },
      });
      if (!msg || msg.roomId !== params.roomId)
        throw new NotFoundException('Message not found in room');
      lastReadAt = msg.createdAt;
      lastReadMessageId = msg.id;
    }

    await this.prisma.roomMember.update({
      where: {
        roomId_userId: { roomId: params.roomId, userId: params.userId },
      },
      data: { lastReadAt, lastReadMessageId },
    });
  }

  async getUnreadCount(params: { roomId: string; userId: string }) {
    const membership = await this.prisma.roomMember.findUnique({
      where: {
        roomId_userId: { roomId: params.roomId, userId: params.userId },
      },
    });
    if (!membership) return 0;
    return this.prisma.message.count({
      where: {
        roomId: params.roomId,
        userId: { not: params.userId },
        createdAt: membership.lastReadAt
          ? { gt: membership.lastReadAt }
          : undefined,
      },
    });
  }

  async updateGroupRoomName(params: {
    roomId: string;
    actorUserId: string;
    name: string;
  }) {
    const nextName = params.name.trim();
    if (!nextName) throw new BadRequestException('Room name is required');
    await this.requireGroupOwner(params.roomId, params.actorUserId);
    await this.prisma.room.update({
      where: { id: params.roomId },
      data: { name: nextName },
    });
    return this.getRoomWithDetails(params.roomId);
  }

  async addGroupMembers(params: {
    roomId: string;
    actorUserId: string;
    userIds: string[];
  }) {
    await this.requireGroupOwner(params.roomId, params.actorUserId);
    const normalized = Array.from(
      new Set(params.userIds.map((id) => id.trim()).filter(Boolean)),
    );
    if (!normalized.length) {
      throw new BadRequestException('At least one userId is required');
    }
    await Promise.all(normalized.map((id) => this.requireRegisteredUser(id)));
    await this.prisma.$transaction(
      normalized.map((userId) =>
        this.prisma.roomMember.upsert({
          where: {
            roomId_userId: { roomId: params.roomId, userId },
          },
          update: {},
          create: {
            roomId: params.roomId,
            userId,
            role: RoomRole.MEMBER,
          },
        }),
      ),
    );
    return this.getRoomWithDetails(params.roomId);
  }

  async removeGroupMember(params: {
    roomId: string;
    actorUserId: string;
    targetUserId: string;
  }) {
    const targetUserId = params.targetUserId.trim();
    if (!targetUserId)
      throw new BadRequestException('targetUserId is required');
    await this.requireGroupOwner(params.roomId, params.actorUserId);
    if (targetUserId === params.actorUserId) {
      throw new BadRequestException(
        'Owners cannot remove themselves. Use leave room instead.',
      );
    }
    const membership = await this.prisma.roomMember.findUnique({
      where: {
        roomId_userId: { roomId: params.roomId, userId: targetUserId },
      },
    });
    if (!membership) throw new NotFoundException('Member not found in room');
    if (membership.role === RoomRole.OWNER) {
      throw new ForbiddenException(
        'Cannot remove another owner. Transfer ownership first.',
      );
    }
    await this.prisma.roomMember.delete({
      where: {
        roomId_userId: { roomId: params.roomId, userId: targetUserId },
      },
    });
    return this.getRoomWithDetails(params.roomId);
  }

  async leaveGroupRoom(params: { roomId: string; userId: string }) {
    await this.requireGroupRoom(params.roomId);
    const membership = await this.prisma.roomMember.findUnique({
      where: {
        roomId_userId: { roomId: params.roomId, userId: params.userId },
      },
    });
    if (!membership) throw new NotFoundException('Member not found in room');

    await this.prisma.$transaction(async (tx) => {
      if (membership.role === RoomRole.OWNER) {
        const nextOwner = await tx.roomMember.findFirst({
          where: {
            roomId: params.roomId,
            userId: { not: params.userId },
          },
          orderBy: { joinedAt: 'asc' },
        });
        if (nextOwner) {
          await tx.roomMember.update({
            where: {
              roomId_userId: {
                roomId: params.roomId,
                userId: nextOwner.userId,
              },
            },
            data: { role: RoomRole.OWNER },
          });
        }
      }

      await tx.roomMember.delete({
        where: {
          roomId_userId: { roomId: params.roomId, userId: params.userId },
        },
      });

      const remaining = await tx.roomMember.count({
        where: { roomId: params.roomId },
      });
      if (remaining === 0) {
        await tx.room.delete({ where: { id: params.roomId } });
      }
    });
  }

  async deleteGroupRoom(params: { roomId: string; actorUserId: string }) {
    await this.requireGroupOwner(params.roomId, params.actorUserId);
    await this.prisma.room.delete({ where: { id: params.roomId } });
  }
}
