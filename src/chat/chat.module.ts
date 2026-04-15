import { Module } from '@nestjs/common';
import { ChatCoordinatorService } from './chat-coordinator.service';
import { ChatGateway } from './ws/chat.gateway';
import { ChatEventsService } from './ws/chat-events.service';
import { ChatRoomStateService } from './ws/chat-room-state.service';
import { RoomsController } from './rooms/rooms.controller';
import { MessagesController } from './messages/messages.controller';
import { UploadsController } from './uploads/uploads.controller';
import { RoomsService } from './rooms/rooms.service';
import { MessagesService } from './messages/messages.service';
import { UploadsService } from './uploads/uploads.service';

@Module({
  controllers: [RoomsController, MessagesController, UploadsController],
  providers: [
    ChatEventsService,
    ChatRoomStateService,
    ChatCoordinatorService,
    ChatGateway,
    RoomsService,
    MessagesService,
    UploadsService,
  ],
  exports: [
    RoomsService,
    MessagesService,
    UploadsService,
    ChatCoordinatorService,
  ],
})
export class ChatModule {}
