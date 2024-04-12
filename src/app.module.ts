import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { NotificationModule } from './notification/notification.module';
import { AccountModule } from './account/account.module';
import { AccountModule } from './user/account/account.module';

@Module({
  imports: [ProvinceModule, SpecialtyModule, NotificationModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
