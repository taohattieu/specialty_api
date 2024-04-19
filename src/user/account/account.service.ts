import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entities';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountEntityRepository: Repository<AccountEntity>,
  ) {}

  async createAccount(accountEntity: Partial<AccountEntity>): Promise<AccountEntity> {
    return await this.accountEntityRepository.save(accountEntity);
  }

  async findByUsername(username: string): Promise<AccountEntity> {
    return await this.accountEntityRepository.findOne({ where: { username } });
  }
}
