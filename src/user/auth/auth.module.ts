import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    JwtModule, 
    AccountModule, 
  ],
  providers: [
    AuthService,
    JwtService, 
  ],
  controllers: [AuthController],
})
export class AuthModule {}
