import { EntityRepository, Repository } from 'typeorm';
import { NotificationEntity } from './notification.entities';

// @EntityRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {}
