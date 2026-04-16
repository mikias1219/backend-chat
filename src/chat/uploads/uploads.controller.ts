import {
  BadRequestException,
  Controller,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import type { Request } from 'express';
import { join } from 'path';
import { AttachmentKind } from '../../generated/prisma';
import { BearerAuthGuard } from '../../auth/bearer-auth.guard';
import { CurrentUser, type CurrentUserIdentity } from '../../auth/current-user';
import { RoomsService } from '../rooms/rooms.service';
import { UploadsService } from './uploads.service';

function safeFileName(original: string) {
  const base = original.replace(/[^\w.\- ()]/g, '_').slice(0, 180);
  return base.length ? base : 'file';
}

@ApiTags('chat-uploads', 'chat-channels', 'chat-direct')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('chat')
export class UploadsController {
  constructor(
    private readonly rooms: RoomsService,
    private readonly uploads: UploadsService,
  ) {}

  @Post('rooms/:roomId/uploads')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Upload a file for a room (returns attachmentId)' })
  @ApiParam({ name: 'roomId', required: true })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const id = crypto.randomUUID();
          const safe = safeFileName(file.originalname);
          cb(null, `${id}-${safe}`);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
    }),
  )
  async upload(
    @Param('roomId') roomId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    if (!file) {
      throw new BadRequestException('file is required');
    }

    const me = await this.rooms.requireRegisteredUser(user.userId, {
      name: user.name,
      email: user.email ?? null,
    });
    await this.rooms.requireMember(roomId, me.id);

    const mime = file?.mimetype || 'application/octet-stream';
    const kind: AttachmentKind = mime.startsWith('image/')
      ? AttachmentKind.IMAGE
      : AttachmentKind.FILE;

    const proto =
      (req.headers['x-forwarded-proto'] as string | undefined) ?? req.protocol;
    const host =
      (req.headers['x-forwarded-host'] as string | undefined) ??
      req.get('host');
    const origin = host ? `${proto}://${host}` : '';
    const urlPath = `/uploads/${file.filename}`;
    const url = origin ? `${origin}${urlPath}` : urlPath;

    const created = await this.uploads.createPendingAttachment({
      roomId,
      uploaderId: me.id,
      kind,
      fileName: file.originalname,
      mimeType: mime,
      sizeBytes: file.size,
      url,
    });

    return { ok: true, attachment: created };
  }

  @Post('channels/:channelId/uploads')
  @ApiOperation({ summary: 'Upload a file for a channel' })
  @ApiParam({ name: 'channelId', required: true })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const id = crypto.randomUUID();
          const safe = safeFileName(file.originalname);
          cb(null, `${id}-${safe}`);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 },
    }),
  )
  async uploadToChannel(
    @Param('channelId') channelId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.upload(channelId, file, req, user);
  }

  @Post('direct/:directId/uploads')
  @ApiOperation({ summary: 'Upload a file for a private direct chat' })
  @ApiParam({ name: 'directId', required: true })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const id = crypto.randomUUID();
          const safe = safeFileName(file.originalname);
          cb(null, `${id}-${safe}`);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 },
    }),
  )
  async uploadToDirect(
    @Param('directId') directId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @CurrentUser() user: CurrentUserIdentity,
  ) {
    return this.upload(directId, file, req, user);
  }
}
