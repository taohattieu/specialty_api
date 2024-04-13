import { Favorites } from 'src/favorites/favorites.entities';
import { NotificationEntity } from 'src/notification/notification.entities';
import { ProfileEntity } from 'src/user/profile/entities/profile.entities';
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {

  @PrimaryGeneratedColumn('uuid')
  account_id: string

  @Column()
  username: string;

  @Column()
  password: string

  @OneToOne(() => ProfileEntity, (profile) => profile.account)
  profile: ProfileEntity;

  @OneToMany(() => NotificationEntity, notification => notification.account)
  notification: NotificationEntity[];

  @OneToMany(() => Favorites, favorites => favorites.account)
  favorites: Favorites[];
}
