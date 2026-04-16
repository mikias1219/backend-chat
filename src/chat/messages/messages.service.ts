import { BadRequestException, Injectable } from '@nestjs/common';
import { AttachmentKind, ReceiptStatus } from '../../generated/prisma';
import { PrismaService } from '../../database/prisma.service';

export type AttachmentOut = {
  id: string;
  kind: AttachmentKind;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
};

export type MessageReplyPreview = {
  id: string;
  userId: string;
  userName: string;
  body: string;
};

export type MessageOut = {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  body: string;
  replyToId?: string | null;
  replyTo?: MessageReplyPreview | null;
  createdAt: string;
  deliveredTo: string[];
  readBy: string[];
  attachments?: AttachmentOut[];
};

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(params: {
    roomId: string;
    userId: string;
    body: string;
    replyToId?: string;
    attachmentIds?: string[];
  }): Promise<MessageOut> {
    const attachmentIds = (params.attachmentIds ?? []).filter(Boolean);

    if (params.replyToId) {
      const parent = await this.prisma.message.findUnique({
        where: { id: params.replyToId },
      });
      if (!parent || parent.roomId !== params.roomId) {
        throw new BadRequestException(
          'replyToId must reference a message in the same room',
        );
      }
      if (parent.userId === params.userId) {
        throw new BadRequestException('You cannot reply to your own message');
      }
    }

    const created = await this.prisma.$transaction(async (tx) => {
      const msg = await tx.message.create({
        data: {
          roomId: params.roomId,
          userId: params.userId,
          body: params.body,
          replyToId: params.replyToId,
          receipts: {
            create: [
              { userId: params.userId, status: ReceiptStatus.DELIVERED },
              { userId: params.userId, status: ReceiptStatus.READ },
            ],
          },
        },
        include: { user: true, receipts: true },
      });

      if (attachmentIds.length) {
        await tx.attachment.updateMany({
          where: {
            id: { in: attachmentIds },
            roomId: params.roomId,
            uploaderId: params.userId,
            messageId: null,
          },
          data: { messageId: msg.id },
        });
      }

      return tx.message.findUniqueOrThrow({
        where: { id: msg.id },
        include: {
          user: true,
          receipts: true,
          attachments: true,
          replyTo: { include: { user: true } },
        },
      });
    });

    return this.toOut(created);
  }

  /**
   * Paginated history: default is latest page. Use `beforeMessageId` to load older messages (infinite scroll up).
   */
  async listMessages(params: {
    roomId: string;
    limit?: number;
    beforeMessageId?: string;
    afterMessageId?: string;
  }): Promise<MessageOut[]> {
    const limit = Math.max(1, Math.min(200, params.limit ?? 50));

    let cursorDate: Date | undefined;
    if (params.beforeMessageId) {
      const anchor = await this.prisma.message.findUnique({
        where: { id: params.beforeMessageId },
      });
      if (!anchor || anchor.roomId !== params.roomId) {
        throw new BadRequestException('beforeMessageId is not in this room');
      }
      cursorDate = anchor.createdAt;
    }
    if (params.afterMessageId) {
      const anchor = await this.prisma.message.findUnique({
        where: { id: params.afterMessageId },
      });
      if (!anchor || anchor.roomId !== params.roomId) {
        throw new BadRequestException('afterMessageId is not in this room');
      }
      cursorDate = anchor.createdAt;
    }

    const where: {
      roomId: string;
      createdAt?: { lt?: Date; gt?: Date };
    } = { roomId: params.roomId };

    if (cursorDate) {
      if (params.beforeMessageId) where.createdAt = { lt: cursorDate };
      if (params.afterMessageId) where.createdAt = { gt: cursorDate };
    }

    const orderBy = params.afterMessageId
      ? ({ createdAt: 'asc' } as const)
      : ({ createdAt: 'desc' } as const);

    const messages = await this.prisma.message.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        user: true,
        receipts: true,
        attachments: true,
        replyTo: { include: { user: true } },
      },
    });

    const ordered = params.afterMessageId ? messages : messages.reverse();
    return ordered.map((m) => this.toOut(m));
  }

  /** @deprecated Prefer listMessages */
  async getRecent(params: {
    roomId: string;
    limit?: number;
  }): Promise<MessageOut[]> {
    return this.listMessages({ roomId: params.roomId, limit: params.limit });
  }

  async markDelivered(params: {
    roomId: string;
    messageId: string;
    userId: string;
  }) {
    const msg = await this.prisma.message.findUnique({
      where: { id: params.messageId },
    });
    if (!msg || msg.roomId !== params.roomId) return;
    await this.prisma.messageReceipt.upsert({
      where: {
        messageId_userId_status: {
          messageId: params.messageId,
          userId: params.userId,
          status: ReceiptStatus.DELIVERED,
        },
      },
      update: {},
      create: {
        messageId: params.messageId,
        userId: params.userId,
        status: ReceiptStatus.DELIVERED,
      },
    });
  }

  async markRead(params: {
    roomId: string;
    messageId: string;
    userId: string;
  }) {
    const msg = await this.prisma.message.findUnique({
      where: { id: params.messageId },
    });
    if (!msg || msg.roomId !== params.roomId) return;

    await this.prisma.messageReceipt.upsert({
      where: {
        messageId_userId_status: {
          messageId: params.messageId,
          userId: params.userId,
          status: ReceiptStatus.DELIVERED,
        },
      },
      update: {},
      create: {
        messageId: params.messageId,
        userId: params.userId,
        status: ReceiptStatus.DELIVERED,
      },
    });

    await this.prisma.messageReceipt.upsert({
      where: {
        messageId_userId_status: {
          messageId: params.messageId,
          userId: params.userId,
          status: ReceiptStatus.READ,
        },
      },
      update: {},
      create: {
        messageId: params.messageId,
        userId: params.userId,
        status: ReceiptStatus.READ,
      },
    });
  }

  private toOut(message: {
    id: string;
    roomId: string;
    userId: string;
    body: string;
    replyToId: string | null;
    createdAt: Date;
    user: { name: string };
    receipts: { userId: string; status: ReceiptStatus }[];
    attachments: {
      id: string;
      kind: AttachmentKind;
      fileName: string;
      mimeType: string;
      sizeBytes: number;
      url: string;
    }[];
    replyTo?: {
      id: string;
      userId: string;
      body: string;
      user: { name: string };
    } | null;
  }): MessageOut {
    const deliveredTo = message.receipts
      .filter(
        (r) =>
          r.status === ReceiptStatus.DELIVERED ||
          r.status === ReceiptStatus.READ,
      )
      .map((r) => r.userId);
    const readBy = message.receipts
      .filter((r) => r.status === ReceiptStatus.READ)
      .map((r) => r.userId);

    return {
      id: message.id,
      roomId: message.roomId,
      userId: message.userId,
      userName: message.user.name,
      body: message.body,
      replyToId: message.replyToId,
      replyTo: message.replyTo
        ? {
            id: message.replyTo.id,
            userId: message.replyTo.userId,
            userName: message.replyTo.user.name,
            body: message.replyTo.body,
          }
        : null,
      createdAt: message.createdAt.toISOString(),
      deliveredTo: Array.from(new Set(deliveredTo)),
      readBy: Array.from(new Set(readBy)),
      attachments: (message.attachments ?? []).map((a) => ({
        id: a.id,
        kind: a.kind,
        fileName: a.fileName,
        mimeType: a.mimeType,
        sizeBytes: a.sizeBytes,
        url: a.url,
      })),
    };
  }
}
