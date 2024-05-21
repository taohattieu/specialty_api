import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationEntity } from './notification.entities';
import { AccountEntity } from 'src/user/account/entities/account.entities';
import { NotificationRepository } from './notification.respository';
import { AccountModule } from 'src/user/account/account.module'; // Import AccountModule

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationEntity, AccountEntity, NotificationRepository]),
        AccountModule // Thêm AccountModule
    ], 
    providers: [NotificationService],
    controllers: [NotificationController]
})
export class NotificationModule {}
