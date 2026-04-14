import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class RoomMemberDto {
  @ApiProperty() userId!: string;
  @ApiProperty({ required: false, nullable: true }) name?: string | null;
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
}

export class ListRoomsResponseDto {
  @ApiProperty() ok!: boolean;
  @ApiProperty({ type: [ChatRoomDto] }) rooms!: ChatRoomDto[];
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

