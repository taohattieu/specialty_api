import { BasedEntity } from "src/common/based.entity";
import { AccountEntity } from "src/user/account/entities/account.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification')
export class NotificationEntity extends BasedEntity {
    @PrimaryGeneratedColumn('uuid')
    notification_id: string;

    @Column()
    type: string;

    @Column()
    message: string;

    @ManyToOne(() => AccountEntity, { eager: true })
    @JoinColumn({ name: 'account_id' })
    account?: AccountEntity; // Cho phép null
}
