import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

export class CreateRoomDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true, default: RoomType.SINGLE })
  type: RoomType;

  @ApiProperty({ required: true, default: true })
  hasRoomonitor: boolean;

  @ApiProperty({ required: true })
  maxGuests: number;

  @ApiProperty({ required: false, default: 1 })
  minGuests: number;

  @ApiProperty({ required: false, default: true })
  isAvailable: boolean;

  @ApiProperty({ required: false, default: [] })
  amenitiesIds: string[];
}
