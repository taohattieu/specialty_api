import { Module } from '@nestjs/common';
import { SpecialtyDetailsService } from './specialty-details.service';
import { SpecialtyDetailsController } from './specialty-details.controller';

@Module({
  providers: [SpecialtyDetailsService],
  controllers: [SpecialtyDetailsController]
})
export class SpecialtyModule {}
