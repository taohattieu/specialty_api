
import { BasedEntity } from 'src/common/based.entity';
import { FavoritesEntity } from 'src/favorites/favorites.entities';
import { NotificationEntity } from 'src/notification/notification.entities';
import { ProfileEntity } from 'src/user/profile/entities/profile.entities';
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity extends BasedEntity {

  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'longtext' })
  refreshToken?: string;

  @OneToOne(() => ProfileEntity, ({ account }) => account)
  profile: ProfileEntity;

  @OneToMany(() => NotificationEntity, notification => notification.account)
  notification: NotificationEntity[];

  @OneToMany(() => FavoritesEntity, favorites => favorites.account)
  favorites: FavoritesEntity[];
}
