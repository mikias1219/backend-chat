import { Injectable } from '@nestjs/common';
import { AttachmentKind } from '../../generated/prisma';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UploadsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPendingAttachment(params: {
    roomId: string;
    uploaderId: string;
    kind: AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
  }) {
    return this.prisma.attachment.create({
      data: {
        roomId: params.roomId,
        uploaderId: params.uploaderId,
        messageId: null,
        kind: params.kind,
        fileName: params.fileName,
        mimeType: params.mimeType,
        sizeBytes: params.sizeBytes,
        url: params.url,
      },
    });
  }
}

