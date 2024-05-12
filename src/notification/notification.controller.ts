import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './notification.dto';
import { NotificationEntity } from './notification.entities';
import { ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(): Promise<NotificationEntity[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.notificationService.findById(id);
  }

  @Post()
  create(@Body() createNotificationDto: NotificationDto): Promise<NotificationEntity> {
    return this.notificationService.create(createNotificationDto);
  }

  @Put(':id')
  update(@Param('id') notification_id: string, @Body() updateNotificationDto: NotificationDto): Promise<NotificationEntity> {
    return this.notificationService.update(notification_id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') notification_id: string): Promise<void> {
    return this.notificationService.remove(notification_id);
  }
}
