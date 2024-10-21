import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new room, optionally with an array of amenity IDs
   * @param createRoomDto - the data for the new room
   * @returns an array of objects containing the new room data and the newly-created room-amenity connections
   */
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

  /**
   * Finds all rooms, each with its associated amenities
   * @returns an array of room objects, each containing a `RoomAmenities` array with
   * associated `amenity` objects
   */
  findAll() {
    return this.prisma.room.findMany({
      include: {
        RoomAmenities: { include: { amenity: true } },
      },
    });
  }

  /**
   * Finds a single room by ID, including its associated amenities
   * @param id the id of the room to find
   * @returns a single room object, containing a `RoomAmenities` array with
   * associated `amenity` objects
   * @throws {Prisma.NotFoundError} if no room with the given ID exists
   */
  findOne(id: string) {
    return this.prisma.room.findFirstOrThrow({
      where: { id },
      include: {
        RoomAmenities: { include: { amenity: true } },
      },
    });
  }

  /**
   * Updates a room and its associated amenities.
   * If the room did not already have the specified amenities, they are created.
   * @param id the id of the room to update
   * @param updateRoomDto the data to update the room with
   * @returns an array of updated room objects and/or created amenities and room-amenities connections
   */
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

  /**
   * Removes a room and its associated amenities.
   * @param id the id of the room to remove
   * @returns the deleted room object, including its associated amenities
   */
  remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
      include: { RoomAmenities: true },
    });
  }
}
