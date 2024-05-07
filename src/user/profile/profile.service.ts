import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileDto } from './dto/profile-update.dto';
import { ProfileRepository } from './profile.repository';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entities';
import { JwtClaimDto } from 'src/common/jwt-claim.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly _profileRepository: ProfileRepository,
  ) {}

  async update(authUser: JwtClaimDto, updateProfileDto: UpdateProfileDto) {
    try {
      const user = await this._profileRepository.findOne({
        where: { profile_id: authUser.profile_id },
        relations: ['account'],
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      // Cập nhật thông tin của người dùng
      await this._profileRepository.update(
        { profile_id: authUser.profile_id },
        updateProfileDto,
      );
      // Lấy thông tin người dùng sau khi cập nhật
      const updatedUser = await this._profileRepository.findOne({
        where: { profile_id: authUser.profile_id },
        relations: ['account'],
      });
      return new ProfileDto(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(authUser: JwtClaimDto) {
    try {
      const user = await this._profileRepository.findOne({
        where: { profile_id: authUser.profile_id },
        relations: ['account'],
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return new ProfileDto(user);
    } catch (error) {
      throw error;
    }
  }
}
