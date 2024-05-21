import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entities';
import { NotificationDto } from './notification.dto';
import { AccountRepository } from 'src/user/account/account.repository'; // Import AccountRepository

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity)
        private notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(AccountRepository) // Inject AccountRepository
        private accountRepository: AccountRepository,
    ) {}

    async create(createNotificationDto: NotificationDto): Promise<NotificationEntity> {
        const notification = new NotificationEntity();
        notification.type = createNotificationDto.type;
        notification.message = createNotificationDto.message;

        if (createNotificationDto.account_id) {
            const account = await this.accountRepository.findOne({ // Sử dụng AccountRepository
                where: { account_id: createNotificationDto.account_id }
            });
            if (!account) {
                throw new NotFoundException('Account not found');
            }
            notification.account = account;
        }

        return await this.notificationRepository.save(notification);
    }

  async findAll(): Promise<NotificationEntity[]> {
    return await this.notificationRepository.find();
  }

  async findById(notification_id: string): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({ where: {notification_id}});
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async update(notification_id: string, updateNotificationDto: NotificationDto): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({ where: { notification_id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Cập nhật thông báo với dữ liệu mới
    Object.assign(notification, updateNotificationDto);
    return await this.notificationRepository.save(notification);
  }

  async remove(notification_id: string): Promise<void> {
    const notification = await this.notificationRepository.findOne({ where: { notification_id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    await this.notificationRepository.remove(notification);
  }
}
