import { Module } from '@nestjs/common';
import { ProvinceModule } from './province/province.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './user/auth/auth.module';
import { ProfileModule } from './user/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Province } from './province/province.entities';
import { NotificationEntity } from './notification/notification.entities';
import { AccountEntity } from './user/account/entities/account.entities';
import { ProfileEntity } from './user/profile/entities/profile.entities';
import { SpecialtyDetails } from './specialty-details/specialty-details.entities';
import { RegionsModule } from './regions/regions.module';
import { Regions } from './regions/regions.entities';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesEntity } from './favorites/favorites.entities';
import { SpecialtyDetailsModule } from './specialty-details/specialty-details.module';
import { AccountModule } from './user/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { ImageEntity } from './user/profile/entities/image.entities';
import { ImagesModule } from './user/profile/image.module';
import { SpecialtyEntity } from './specialty/specialty.entities';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60, // 1 day
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
        AccountEntity,
        SpecialtyEntity,
        SpecialtyDetails,
        NotificationEntity,
        ProfileEntity,
        FavoritesEntity,
        // ImageEntity
      ],
      synchronize: true,
      // logging: true
    }),
    ProvinceModule,
    SpecialtyDetailsModule,
    NotificationModule,
    AuthModule,
    ProfileModule,
    RegionsModule,
    AccountModule,
    SpecialtyModule,
    FavoritesModule,
    JwtModule,
    // ImagesModule
  ],
})
export class AppModule {}
