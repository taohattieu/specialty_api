import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './notification.dto';
import { NotificationEntity } from './notification.entities';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Sử dụng guard nếu cần
  async create(@Body() createNotificationDto: NotificationDto): Promise<NotificationEntity> {
      try {
          return await this.notificationService.create(createNotificationDto);
      } catch (error) {
          if (error instanceof NotFoundException) {
              throw error; // Nếu không tìm thấy tài khoản, ném lại lỗi
          } else {
              throw new UnauthorizedException('Unauthorized'); // Lỗi khác, ném lỗi 401
          }
      }
  }

  @Get()
  findAll(): Promise<NotificationEntity[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.notificationService.findById(id);
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
