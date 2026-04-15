import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ReceiptRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  messageId!: string;
}
