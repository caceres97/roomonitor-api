import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AmenitiesController],
  providers: [AmenitiesService],
  imports: [PrismaModule],
})
export class AmenitiesModule {}
