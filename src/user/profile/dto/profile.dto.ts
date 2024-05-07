import { ApiProperty } from '@nestjs/swagger';
import { BasedDto } from 'src/common/based.dto';
import { ProfileEntity } from '../entities/profile.entities';


export class ProfileDto extends BasedDto {
  @ApiProperty()
  displayName?: string;

  @ApiProperty()
  avatar?: string;

  constructor(user: ProfileEntity) {
    super(user);
    this.displayName = user.displayName;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
