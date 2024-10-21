import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

export class CreateRoomDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  type: RoomType;
}
