import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entities';
import { NotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async create(createNotificationDto: NotificationDto): Promise<NotificationEntity> {
    const notification = new NotificationEntity();
    notification.type = createNotificationDto.type;
    notification.message = createNotificationDto.message;
    (notification as any).account = createNotificationDto.account_id;


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
