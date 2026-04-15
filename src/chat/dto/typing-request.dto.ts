import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class TypingRequestDto {
  @ApiProperty()
  @IsBoolean()
  isTyping!: boolean;
}
