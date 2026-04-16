import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RoomMemberDto {
  @ApiProperty() userId!: string;
  @ApiProperty({ required: false, nullable: true }) name?: string | null;
  @ApiProperty({ enum: ['OWNER', 'MEMBER'], required: false })
  role?: 'OWNER' | 'MEMBER';
}

export class RoomLastMessageDto {
  @ApiProperty() id!: string;
  @ApiProperty() body!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() userName!: string;
  @ApiProperty() hasAttachments!: boolean;
}

export class ChatRoomDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ['DIRECT', 'GROUP'] }) type!: 'DIRECT' | 'GROUP';
  @ApiProperty({ required: false, nullable: true }) directKey?: string | null;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
  @ApiProperty({ type: [String] }) memberUserIds!: string[];
  @ApiProperty({ type: [RoomMemberDto] }) members!: RoomMemberDto[];
  @ApiProperty() unreadCount!: number;
  @ApiProperty({
    type: RoomLastMessageDto,
    required: false,
    nullable: true,
  })
  lastMessage?: RoomLastMessageDto | null;
}

export class ListRoomsResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: [ChatRoomDto] }) rooms!: ChatRoomDto[];
}

export class ChatDirectoryUserDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty({ required: false, nullable: true }) directRoomId?:
    | string
    | null;
}

export class ListUsersResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: [ChatDirectoryUserDto] })
  users!: ChatDirectoryUserDto[];
}

export class CreateRoomRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id?: string;
}

export class CreateRoomResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: ChatRoomDto }) room!: ChatRoomDto;
}

export class GetRoomResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: ChatRoomDto }) room!: ChatRoomDto;
}

export class CreateDmRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  otherUserId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  otherName?: string;
}

export class UpdateRoomRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name!: string;
}

export class UpdateRoomResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: ChatRoomDto }) room!: ChatRoomDto;
}

export class AddRoomMembersRequestDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  @IsString({ each: true })
  userIds!: string[];
}

export class UpdateRoomMembersResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: ChatRoomDto }) room!: ChatRoomDto;
}
