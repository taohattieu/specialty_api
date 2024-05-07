import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entities';
import { AccountEntity } from '../account/entities/account.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, AccountEntity])],
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController]
})
export class ProfileModule {}
