import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  type: RoomType;

  @ApiProperty({ required: true })
  hasRoomonitor: boolean;

  @ApiProperty({ required: true })
  maxGuests: number;

  @ApiProperty({ required: false })
  minGuests: number;

  @ApiProperty({ required: false })
  isAvailable: boolean;

  @ApiProperty({ required: false })
  amenitiesIds: string[];
}
