import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { Province } from './province.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Province])], 
  providers: [ProvinceService], 
  controllers: [ProvinceController] 
})
export class ProvinceModule {}
