import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountModule } from '../account/account.module';
import { AccountEntity } from '../account/entities/account.entities';
import { ProfileEntity } from '../profile/entities/profile.entities';
import { CacheModule } from '@nestjs/cache-manager';
import { TokenService } from 'src/common/token.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60, // 1 day
    }),
    AccountModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: '1d'
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AccountEntity, ProfileEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenService],
  exports: [AuthService, PassportModule], 
})
export class AuthModule {}
