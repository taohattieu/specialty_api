import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProvinceService } from './province.service';
import { Province } from './province.entities';
import { ProvinceDto } from './province.dto';

@Controller('province')
@ApiTags('Province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  async getAllProvinces(): Promise<Province[]> {
    return this.provinceService.getAllProvinces();
  }

  @Post()
  async createProvince(@Body() provinceDto: ProvinceDto): Promise<Province> {
    return this.provinceService.createProvince(provinceDto);
  }
}
