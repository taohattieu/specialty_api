import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { AccountDto } from 'src/user/account/dto/account.dto';
import { ProfileDto } from 'src/user/profile/dto/profile.dto';

export class LoginResponseDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;

  @ApiProperty({ type: AccountDto })
  account: AccountDto;

  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;
}
