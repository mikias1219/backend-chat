import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MarkReadRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  upToMessageId?: string;
}

