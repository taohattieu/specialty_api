import { Module } from '@nestjs/common';
import { SpecialtyController } from './specialty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './specialty.entities';
import { SpecialtyService } from './specialty.service';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])], 
  providers: [SpecialtyService], 
  controllers: [SpecialtyController] 
})
export class SpecialtyModule {}
