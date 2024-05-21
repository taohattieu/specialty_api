import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entities';

export class AccountRepository extends Repository<AccountEntity> {}
