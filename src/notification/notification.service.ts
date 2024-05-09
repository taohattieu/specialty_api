import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/user/account/entities/account.entities';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entities';
import { NotificationRepository } from './notification.respository';
import { NotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationRepository)
    private _notificationRepository: NotificationRepository,
    @InjectRepository(AccountEntity)
    private _accountRepository: Repository<AccountEntity>,
  ) {}

  // async sendNotification(
  //   notificationDto: NotificationDto,
  // ): Promise<NotificationDto> {
  //   const account = notificationDto.account_id;
  //   if (!account) {
  //     throw new Error('Account information is missing');
  //   }

  //   const accountFromDb = await this._accountRepository.findOne({ where: { account_id: account} });
  // if (!accountFromDb) {
  //   throw new Error('Account not found');
  // }

  //   const notification = this._notificationRepository.create(notificationDto);
  //   notification.send_at = new Date();

  //   return this._notificationRepository.save(notification);
  // }
}
