import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAllAccounts(): Promise<AccountEntity[]> {
    return await this.accountEntityRepository.find();
  }

  async findAccountById(id: string) : Promise<AccountEntity>{
    const account = await this.accountEntityRepository.findOne({ where: { account_id: id } });
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }
}
