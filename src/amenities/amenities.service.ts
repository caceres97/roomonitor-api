import { Injectable } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AmenitiesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAmenityDto: CreateAmenityDto) {
    return this.prisma.amenity.create({ data: createAmenityDto });
  }

  findAll() {
    return this.prisma.amenity.findMany();
  }

  findOne(id: string) {
    return this.prisma.amenity.findFirstOrThrow({ where: { id } });
  }

  update(id: string, updateAmenityDto: UpdateAmenityDto) {
    return this.prisma.amenity.update({
      where: { id },
      data: updateAmenityDto,
    });
  }

  remove(id: string) {
    return this.prisma.amenity.delete({ where: { id } });
  }
}
