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
import { Province } from './province/province.entities';
import { Specialty } from './specialty/specialty.entities';
import { NotificationEntity } from './notification/notification.entities';
import { AccountEntity } from './user/account/entities/account.entities';
import { ProfileEntity } from './user/profile/entities/profile.entities';
import { SpecialtyDetails } from './specialty-details/specialty-details.entities';
import { RegionsModule } from './regions/regions.module';
import { Regions } from './regions/regions.entities';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorites } from './favorites/favorites.entities';
import { SpecialtyDetailsModule } from './specialty-details/specialty-details.module';
import { AccountModule } from './user/account/account.module';

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
      entities: [
        Province,
        Regions,
        Specialty,
        SpecialtyDetails,
        NotificationEntity,
        AccountEntity,
        ProfileEntity,
        Favorites
      ],
      synchronize: true,
      // logging: true
    }),
    ProvinceModule,
    SpecialtyModule,
    SpecialtyDetailsModule,
    NotificationModule,
    AuthModule,
    ProfileModule,
    RegionsModule,
    FavoritesModule,
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
