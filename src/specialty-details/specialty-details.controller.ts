import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecialtyDetailsService } from './specialty-details.service';
import { SpecialtyDetails } from './specialty-details.entities';
import { SpecialtyDetailsAddDto } from './specialty-details-add.dto';
import { SpecialtyDetailsUpdateDto } from './specialty-details-update.dto';

@Controller('specialtyDetails')
@ApiTags('SpecialtyDetails')
export class SpecialtyDetailsController {
  constructor(private readonly specialtyDetailsService: SpecialtyDetailsService) {}

  @Get()
  async getAllSpecialtyDetails(): Promise<SpecialtyDetails[]> {
    return this.specialtyDetailsService.getAllSpecialtyDetails();
  }

  @Post()
  async createSpecialtyDetails(@Body() specialtyDetailsAddDto: SpecialtyDetailsAddDto): Promise<SpecialtyDetails> {
    return this.specialtyDetailsService.createSpecialtyDetails(specialtyDetailsAddDto);
  }
  
  @Get(':id')
  async getSpecialtyDetailsById(@Param('id') id: string): Promise<SpecialtyDetails> {
    return this.specialtyDetailsService.getSpecialtyDetailsById(id);
  }


  @Put(':id')
  async updateSpecialtyDetailsById(@Param('id') id: string, @Body() specialtyDetailsUpdateDto: SpecialtyDetailsUpdateDto): Promise<SpecialtyDetails> {
    return this.specialtyDetailsService.updateSpecialtyDetailsById(id, specialtyDetailsUpdateDto);
  }

  @Delete(':id')
  async deleteSpecialtyDetails(@Param('id') id: string): Promise<void> {
    await this.specialtyDetailsService.deleteSpecialtyDetails(id);
  }
}
