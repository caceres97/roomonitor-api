import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/guards/apikey.guard';

@ApiTags('Amenities')
@UseGuards(ApiKeyGuard)
@ApiHeader({
  name: 'api-key',
  description: 'auth',
})
@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Post()
  create(@Body() createAmenityDto: CreateAmenityDto) {
    return this.amenitiesService.create(createAmenityDto);
  }

  @Get()
  findAll() {
    return this.amenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amenitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmenityDto: UpdateAmenityDto) {
    return this.amenitiesService.update(id, updateAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amenitiesService.remove(id);
  }
}
