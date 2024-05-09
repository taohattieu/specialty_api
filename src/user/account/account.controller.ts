import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountEntity } from './entities/account.entities';

@Controller('account')
@ApiTags("Account")
export class AccountController {
    constructor (private readonly  accountService: AccountService) {} 

    @Get()
    async findAll(): Promise<AccountEntity[]> {
      return await this.accountService.findAllAccounts();
    }

    @Get(':id')
  async getAccountById(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.findAccountById(id);
  }
}
