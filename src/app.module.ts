import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { SpecialtyModule } from './specialty/specialty.module';

@Module({
  imports: [ProvinceModule, SpecialtyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
