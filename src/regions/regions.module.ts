import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { Regions } from './regions.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Regions])],
  providers: [RegionsService], 
  controllers: [RegionsController]
})
export class RegionsModule {}
