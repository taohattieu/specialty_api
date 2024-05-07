import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor (private readonly  accountService: AccountService) {} 

    @Get()
    GetAll() : string {
        return 'Account'
    }
}
