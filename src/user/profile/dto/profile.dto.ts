import { ApiProperty } from '@nestjs/swagger';
import { BasedDto } from 'src/common/based.dto';
import { ProfileEntity } from '../entities/profile.entities';


export class ProfileDto extends BasedDto {

  profile_id: string;

  @ApiProperty()
  displayName?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  coverImage?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;

  constructor(user: ProfileEntity) {
    super(user);
    this.profile_id = user.profile_id;
    this.displayName = user.displayName;
    this.avatar = user.avatar;
    this.coverImage = user.coverImage;
    this.address = user.address;
    this.email = user.email;
    this.phone = user.phone;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
