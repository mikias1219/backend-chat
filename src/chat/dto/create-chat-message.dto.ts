import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @ApiProperty({
    required: false,
    description: 'Text body (optional if attachments are present)',
  })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  replyToId?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachmentIds?: string[];
}
