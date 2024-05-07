import { ApiProperty } from '@nestjs/swagger';

export class JwtClaimDto {
  @ApiProperty()
  profile_id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  account_id: string;
}
