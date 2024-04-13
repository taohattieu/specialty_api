import { AccountEntity } from 'src/user/account/entities/account.entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class ProfileEntity {

  @PrimaryGeneratedColumn('uuid')
  profile_id: string

  @Column()
  fullName: string;

  @Column()
  avatar: string;

  @OneToOne(() => AccountEntity, account => account.profile)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;
  
}
