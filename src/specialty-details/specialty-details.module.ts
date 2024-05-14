import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyDetails } from './specialty-details.entities';
import { SpecialtyDetailsService } from './specialty-details.service';
import { SpecialtyDetailsController } from './specialty-details.controller';
import { Specialty } from 'src/specialty/specialty.entities'; 

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyDetails, Specialty])], 
  providers: [SpecialtyDetailsService],
  controllers: [SpecialtyDetailsController],
})
export class SpecialtyDetailsModule {}
