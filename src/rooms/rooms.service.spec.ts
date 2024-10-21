import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomsService', () => {
  let service: RoomsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService, PrismaService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new room with amenities', async () => {
      const createRoomDto: CreateRoomDto = {
        title: 'Test Room',
        type: 'SINGLE',
        hasRoomonitor: true,
        maxGuests: 2,
        minGuests: 1,
        isAvailable: true,
        amenitiesIds: [' amenity-1', 'amenity-2'],
      };

      const result = await service.create(createRoomDto);
      expect(result).toEqual([
        expect.objectContaining({
          id: expect.any(String),
          title: 'Test Room',
          type: 'SINGLE',
          hasRoomonitor: true,
          maxGuests: 2,
          minGuests: 1,
          isAvailable: true,
        }),
        expect.objectContaining({
          id: expect.any(String),
          amenityId: 'amenity-1',
          roomId: expect.any(String),
        }),
        expect.objectContaining({
          id: expect.any(String),
          amenityId: 'amenity-2',
          roomId: expect.any(String),
        }),
      ]);
    });
  });

  describe('findAll', () => {
    it('should find all rooms with amenities', async () => {
      const result = await service.findAll();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            type: expect.any(String),
            hasRoomonitor: expect.any(Boolean),
            maxGuests: expect.any(Number),
            minGuests: expect.any(Number),
            isAvailable: expect.any(Boolean),
            RoomAmenities: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                amenityId: expect.any(String),
                roomId: expect.any(String),
                amenity: expect.objectContaining({
                  id: expect.any(String),
                  name: expect.any(String),
                }),
              }),
            ]),
          }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('should find one room by id', async () => {
      const id = 'room-1';
      const result = await service.findOne(id);
      expect(result).toEqual(
        expect.objectContaining({
          id,
          title: expect.any(String),
          type: expect.any(String),
          hasRoomonitor: expect.any(Boolean),
          maxGuests: expect.any(Number),
          minGuests: expect.any(Number),
          isAvailable: expect.any(Boolean),
          RoomAmenities: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              amenityId: expect.any(String),
              roomId: expect.any(String),
              amenity: expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
              }),
            }),
          ]),
        }),
      );
    });
  });

  describe('update', () => {
    it('should update a room', async () => {
      const id = 'room-1';
      const updateRoomDto: UpdateRoomDto = {
        title: 'Updated Room',
        type: 'DOUBLE',
        hasRoomonitor: false,
        maxGuests: 3,
        minGuests: 2,
        isAvailable: false,
        amenitiesIds: ['amenity-3', 'amenity-4'],
      };

      const result = await service.update(id, updateRoomDto);
      expect(result).toEqual([
        expect.objectContaining({
          id,
          title: 'Updated Room',
          type: 'DOUBLE',
          hasRoomonitor: false,
          maxGuests: 3,
          minGuests: 2,
          isAvailable: false,
        }),
        expect.objectContaining({
          id: expect.any(String),
          amenityId: 'amenity-3',
          roomId: id,
        }),
        expect.objectContaining({
          id: expect.any(String),
          amenityId: 'amenity-4',
          roomId: id,
        }),
      ]);
    });
  });

  describe('remove', () => {
    it('should remove a room', async () => {
      const id = 'room-1';
      const result = await service.remove(id);
      expect(result).toEqual(
        expect.objectContaining({
          id,
          title: expect.any(String),
          type: expect.any(String),
          hasRoomonitor: expect.any(Boolean),
          maxGuests: expect.any(Number),
          minGuests: expect.any(Number),
          isAvailable: expect.any(Boolean),
        }),
      );
    });
  });
});
