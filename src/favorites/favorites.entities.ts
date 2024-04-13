import { Specialty } from "src/specialty/specialty.entities";
import { AccountEntity } from "src/user/account/entities/account.entities";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorites')
export class Favorites {
    @PrimaryGeneratedColumn('uuid')
    favorites_id: string

  @ManyToOne(() => AccountEntity, account => account.favorites)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @OneToOne(() => Specialty, (specialty) => specialty.favorites)
  specialty: Specialty;
}