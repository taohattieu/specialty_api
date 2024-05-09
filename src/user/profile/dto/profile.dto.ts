import { ApiProperty } from '@nestjs/swagger';
import { BasedDto } from 'src/common/based.dto';
import { ProfileEntity } from '../entities/profile.entities';


export class ProfileDto extends BasedDto {

  // profile_id: string;

  @ApiProperty()
  displayName?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  address?: string;

  constructor(user: ProfileEntity) {
    super(user);
    // this.profile_id = user.profile_id;
    this.displayName = user.displayName;
    this.avatar = user.avatar;
    this.address = user.address;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
