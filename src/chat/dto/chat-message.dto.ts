import { ApiProperty } from '@nestjs/swagger';

export class AttachmentDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: ['IMAGE', 'FILE'] }) kind!: 'IMAGE' | 'FILE';
  @ApiProperty() fileName!: string;
  @ApiProperty() mimeType!: string;
  @ApiProperty() sizeBytes!: number;
  @ApiProperty() url!: string;
}

export class ChatMessageDto {
  @ApiProperty() id!: string;
  @ApiProperty() roomId!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() userName!: string;
  @ApiProperty() body!: string;
  @ApiProperty({ required: false, nullable: true }) replyToId?: string | null;
  @ApiProperty() createdAt!: string;
  @ApiProperty({ type: [String] }) deliveredTo!: string[];
  @ApiProperty({ type: [String] }) readBy!: string[];
  @ApiProperty({ type: [AttachmentDto], required: false }) attachments?: AttachmentDto[];
}

