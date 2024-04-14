import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProvinceService } from './province.service';
import { ProvinceAddDto } from './province-add.dto';
import { Province } from './province.entities';
import { ProvinceUpdateDto } from './province-update.dto';

@Controller('province')
@ApiTags('Province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  async getAllProvinces(): Promise<Province[]> {
    return this.provinceService.getAllProvinces();
  }

  @Post()
  async createProvince(@Body() provinceAddDto: ProvinceAddDto): Promise<Province> {
    return this.provinceService.createProvince(provinceAddDto);
  }
  
  @Get(':id')
  async getProvinceById(@Param('id') id: string): Promise<Province> {
    return this.provinceService.getProvinceById(id);
  }


  @Put(':id')
  async updateProvinceById(@Param('id') id: string, @Body() provinceUpdateDto: ProvinceUpdateDto): Promise<Province> {
    return this.provinceService.updateProvinceById(id, provinceUpdateDto);
  }

  @Delete(':id')
  async deleteProvince(@Param('id') id: string): Promise<void> {
    await this.provinceService.deleteProvince(id);
  }
}
