import { Module } from '@nestjs/common';
import { ChatGateway } from './ws/chat.gateway';
import { RoomsController } from './rooms/rooms.controller';
import { MessagesController } from './messages/messages.controller';
import { UploadsController } from './uploads/uploads.controller';
import { RoomsService } from './rooms/rooms.service';
import { MessagesService } from './messages/messages.service';
import { UploadsService } from './uploads/uploads.service';

@Module({
  controllers: [RoomsController, MessagesController, UploadsController],
  providers: [ChatGateway, RoomsService, MessagesService, UploadsService],
  exports: [RoomsService, MessagesService, UploadsService],
})
export class ChatModule {}
