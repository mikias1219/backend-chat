import { Injectable } from '@nestjs/common';
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

export type MessageOut = {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  body: string;
  replyToId?: string | null;
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
        include: { user: true, receipts: true, attachments: true },
      });
    });

    return this.toOut(created);
  }

  async getRecent(params: { roomId: string; limit?: number }): Promise<MessageOut[]> {
    const limit = Math.max(1, Math.min(200, params.limit ?? 50));
    const messages = await this.prisma.message.findMany({
      where: { roomId: params.roomId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: true, receipts: true, attachments: true },
    });
    return messages.reverse().map((m) => this.toOut(m));
  }

  async markDelivered(params: { roomId: string; messageId: string; userId: string }) {
    const msg = await this.prisma.message.findUnique({ where: { id: params.messageId } });
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
      create: { messageId: params.messageId, userId: params.userId, status: ReceiptStatus.DELIVERED },
    });
  }

  async markRead(params: { roomId: string; messageId: string; userId: string }) {
    const msg = await this.prisma.message.findUnique({ where: { id: params.messageId } });
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
      create: { messageId: params.messageId, userId: params.userId, status: ReceiptStatus.DELIVERED },
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
      create: { messageId: params.messageId, userId: params.userId, status: ReceiptStatus.READ },
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
  }): MessageOut {
    const deliveredTo = message.receipts
      .filter((r) => r.status === ReceiptStatus.DELIVERED || r.status === ReceiptStatus.READ)
      .map((r) => r.userId);
    const readBy = message.receipts.filter((r) => r.status === ReceiptStatus.READ).map((r) => r.userId);

    return {
      id: message.id,
      roomId: message.roomId,
      userId: message.userId,
      userName: message.user.name,
      body: message.body,
      replyToId: message.replyToId,
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

