import { BasedEntity } from 'src/common/based.entity';
import { AccountEntity } from 'src/user/account/entities/account.entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class ProfileEntity extends BasedEntity {

  @PrimaryGeneratedColumn('uuid')
  profile_id: string

  @Column()
  displayName: string;

  @Column()
  avatar?: string;

  @Column()
  coverImage?: string;

  @Column()
  address?: string;

  @Column()
  email?: string;

  @Column()
  phone?: string;

  @OneToOne(() => AccountEntity, ({ profile }) => profile)
  @JoinColumn({ name: 'account_id'})
  account: AccountEntity;
  
}
