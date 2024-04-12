import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './user/auth/auth.module';
import { ProfileModule } from './user/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: '12345678',
      database: 'specialty_database',
      entities: [],
      synchronize: true,
      // logging: true
    }),
    ProvinceModule,
    SpecialtyModule,
    NotificationModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
