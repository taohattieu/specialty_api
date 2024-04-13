import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { Regions } from './regions.entities';
import { RegionsDto } from './regions.dto';

@Controller('regions')
@ApiTags('Regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  async getAllRegions(): Promise<Regions[]> {
    return this.regionsService.getAllRegions();
  }

  @Post()
  async createsRegion(@Body(new ValidationPipe()) regionsDto: RegionsDto ): Promise<Regions> {
    return this.regionsService.createRegions(regionsDto);
  }
}
