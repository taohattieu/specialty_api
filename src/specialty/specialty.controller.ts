import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecialtyService } from './specialty.service';
import { SpecialtyAddDto } from './specialty-add.dto';
import { SpecialtyUpdateDto } from './specialty-update.dto';
import { SpecialtyEntity } from './specialty.entities';

@Controller('specialty')
@ApiTags('Specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  async getAllSpecialty(): Promise<SpecialtyEntity[]> {
    return this.specialtyService.getAllSpecialty();
  }

  @Post()
  async createSpecialty(@Body() specialtyAddDto: SpecialtyAddDto): Promise<SpecialtyEntity> {
    return this.specialtyService.createSpecialty(specialtyAddDto);
  }
  
  @Get(':id')
  async getSpecialtyById(@Param('id') id: string): Promise<SpecialtyEntity> {
    return this.specialtyService.getSpecialtyById(id);
  }


  @Put(':id')
  async updateSpecialtyById(@Param('id') id: string, @Body() specialtyUpdateDto: SpecialtyUpdateDto): Promise<SpecialtyEntity> {
    return this.specialtyService.updateSpecialtyById(id, specialtyUpdateDto);
  }

  @Delete(':id')
  async deleteSpecialty(@Param('id') id: string): Promise<void> {
    await this.specialtyService.deleteSpecialty(id);
  }
}
