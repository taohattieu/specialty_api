import { AccountEntity } from "src/user/account/entities/account.entities";
import { ProfileEntity } from "src/user/profile/entities/profile.entities";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('notification')
export class NotificationEntity{
    @PrimaryGeneratedColumn('uuid')
    notification_id: string

    @Column()
    type: string

    @Column()
    message: string

    @Column()
    send_at: Date

    @ManyToOne(() => AccountEntity, account => account.notification)
    @JoinColumn({ name: 'account_id' })
  account: AccountEntity;
}