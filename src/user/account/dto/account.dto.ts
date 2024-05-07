import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '../entities/account.entities';
import { BasedDto } from 'src/common/based.dto';

export class AccountDto extends BasedDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  isVerified: boolean;

  constructor(entity: AccountEntity) {
    super(entity);
    this.username = entity.username;
  }
}
