import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @Post('send')
  // async sendNotification(@Body() notificationDto: NotificationDto) {
  //   return this.notificationService.sendNotification(notificationDto);
  // }
}