import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileDto } from './dto/profile-update.dto';
import { ProfileRepository } from './profile.repository';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entities';
import { JwtClaimDto } from 'src/common/jwt-claim.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async update(authUser: JwtClaimDto, updateProfileDto: UpdateProfileDto) {
    console.log('authUser:', authUser); // Ghi nhật ký để kiểm tra authUser
    if (!authUser || !authUser.profile_id) {
      throw new BadRequestException('Thiếu ID hồ sơ trong token xác thực.');
    }

    const user = await this.profileRepository.findOne({
      where: { profile_id: authUser.profile_id },
      relations: ['account'],
    });

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    // Đảm bảo updateProfileDto không trống
    if (!Object.keys(updateProfileDto).length) {
      throw new BadRequestException('Không có trường hợp lệ nào để cập nhật.');
    }

    await this.profileRepository.update(authUser.profile_id, updateProfileDto);

    // Lấy lại thông tin người dùng đã cập nhật để trả về thông tin chi tiết mới nhất
    const updatedUser = await this.profileRepository.findOne({
      where: { profile_id: authUser.profile_id },
      relations: ['account'],
    });

    return new ProfileDto(updatedUser);
  }

  async getCurrentUser(authUser: JwtClaimDto) {
    const user = await this.profileRepository.findOne({
      where: { account: { username: authUser.username } },
      relations: ['account'],
    });

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    return new ProfileDto(user);
  }
}
