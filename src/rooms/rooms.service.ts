import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const creationData: any[] = [];
    const { amenitiesIds } = createRoomDto;
    delete createRoomDto.amenitiesIds;

    const roomCreation = await this.prisma.room.create({
      data: createRoomDto,
    });

    creationData.push(roomCreation || {});

    if (amenitiesIds && amenitiesIds.length > 0) {
      const createConnections = await this.prisma.roomAmenities.createMany({
        data: amenitiesIds.map((id) => ({
          amenityId: id,
          roomId: roomCreation.id,
        })),
      });
      creationData.push(createConnections);
    }
    return creationData;
  }

  findAll() {
    return this.prisma.room.findMany({
      include: {
        RoomAmenities: { include: { amenity: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.room.findFirstOrThrow({
      where: { id },
      include: {
        RoomAmenities: { include: { amenity: true } },
      },
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const updatingData: any[] = [];
    const { amenitiesIds } = updateRoomDto;
    const udpateData = await this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });

    updatingData.push(udpateData || {});

    if (amenitiesIds && amenitiesIds.length > 0) {
      const createConnections = await this.prisma.roomAmenities.createMany({
        data: amenitiesIds.map((Aid) => ({
          amenityId: Aid,
          roomId: id,
        })),
      });
      updatingData.push(createConnections);
    }
    return updatingData;
  }

  remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
      include: { RoomAmenities: true },
    });
  }
}
