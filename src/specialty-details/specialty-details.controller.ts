import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { SpecialtyDetailsService } from './specialty-details.service';
import { SpecialtyDetailsAddDto } from './specialty-details-add.dto';
import { SpecialtyDetailsUpdateDto } from './specialty-details-update.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('specialty-details')
@ApiTags('Specialty Details')
export class SpecialtyDetailsController {
  constructor(private readonly specialtyDetailsService: SpecialtyDetailsService) {}

  @Get()
  async getAllSpecialtyDetails() {
    return await this.specialtyDetailsService.getAllSpecialtyDetails();
  }

  @Post()
  async createSpecialtyDetails(@Body() specialtyDetailsAddDto: SpecialtyDetailsAddDto) {
    return await this.specialtyDetailsService.createSpecialtyDetails(specialtyDetailsAddDto);
  }

  @Put(':id')
  async updateSpecialtyDetails(@Param('id') id: string, @Body() specialtyDetailsUpdateDto: SpecialtyDetailsUpdateDto) {
    return await this.specialtyDetailsService.updateSpecialtyDetailsById(id, specialtyDetailsUpdateDto);
  }

  @Get(':id')
  async getSpecialtyDetailsById(@Param('id') id: string) {
    return await this.specialtyDetailsService.getSpecialtyDetailsById(id);
  }

  @Delete(':id')
  async deleteSpecialtyDetails(@Param('id') id: string) {
    return await this.specialtyDetailsService.deleteSpecialtyDetails(id);
  }
}
