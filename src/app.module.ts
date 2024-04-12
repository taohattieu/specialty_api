import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './user/auth/auth.module';
import { ProfileModule } from './user/profile/profile.module';

@Module({
  imports: [ProvinceModule, SpecialtyModule, NotificationModule, AuthModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
