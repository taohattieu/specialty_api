import { FavoritesEntity } from 'src/favorites/favorites.entities';
import { Province } from 'src/province/province.entities';
import { SpecialtyDetails } from 'src/specialty-details/specialty-details.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
} from 'typeorm';

@Entity('specialty')
export class SpecialtyEntity {
  @PrimaryGeneratedColumn('uuid')
  specialty_id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  province_id: string;

  @ManyToOne(() => Province, (province) => province.specialty)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @OneToMany(
    () => SpecialtyDetails,
    (specialtydetails) => specialtydetails.Specialty,
  )
  specialtydetails: SpecialtyDetails[];

  @ManyToMany(() => FavoritesEntity, (favorite) => favorite.specialty)
  favorites: FavoritesEntity[];
}
