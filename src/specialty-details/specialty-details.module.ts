import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyDetails } from './specialty-details.entities';
import { SpecialtyDetailsService } from './specialty-details.service';
import { SpecialtyDetailsController } from './specialty-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyDetails])], 
  providers: [SpecialtyDetailsService], 
  controllers: [SpecialtyDetailsController] 
})
export class SpecialtyDetailsModule {}
