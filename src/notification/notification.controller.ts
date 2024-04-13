import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@Controller('notification')
@ApiTags('Notification')
export class NotificationController {
    constructor (private readonly notificationService: NotificationService) {}

    @Get()
    GetAll() : string {
        return 'Notification'
    }
}
