import { Test, TestingModule } from '@nestjs/testing';
import { AmenitiesService } from './amenities.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';

describe('AmenitiesService', () => {
  let service: AmenitiesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmenitiesService, PrismaService],
    }).compile();

    service = module.get<AmenitiesService>(AmenitiesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new amenity', async () => {
      const createAmenityDto: CreateAmenityDto = {
        name: 'Test Amenity',
      };

      const result = await service.create(createAmenityDto);
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: 'Test Amenity',
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should find all amenities', async () => {
      const result = await service.findAll();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('should find one amenity by id', async () => {
      const id = 'amenity-1';
      const result = await service.findOne(id);
      expect(result).toEqual(
        expect.objectContaining({
          id,
          name: expect.any(String),
        }),
      );
    });
  });

  describe('update', () => {
    it('should update an amenity', async () => {
      const id = 'amenity-1';
      const updateAmenityDto: UpdateAmenityDto = {
        name: 'Updated Amenity',
      };

      const result = await service.update(id, updateAmenityDto);
      expect(result).toEqual(
        expect.objectContaining({
          id,
          name: 'Updated Amenity',
        }),
      );
    });
  });

  describe('remove', () => {
    it('should remove an amenity', async () => {
      const id = 'amenity-1';
      const result = await service.remove(id);
      expect(result).toEqual(
        expect.objectContaining({
          id,
          name: expect.any(String),
        }),
      );
    });
  });
});
