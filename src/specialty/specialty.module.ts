import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyRepository } from './specialty.repository';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';
import { SpecialtyEntity } from './specialty.entities';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyEntity])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService, SpecialtyRepository, ], 
  exports: [SpecialtyRepository], 
})
export class SpecialtyModule {}
