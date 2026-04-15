import { ApiProperty } from '@nestjs/swagger';
import { ChatMessageDto } from './chat-message.dto';

export class OkResponseDto {
  @ApiProperty({ example: true }) ok!: boolean;
}

export class PostChatMessageResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: ChatMessageDto }) message!: ChatMessageDto;
}
