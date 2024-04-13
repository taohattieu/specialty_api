import { Favorites } from 'src/favorites/favorites.entities';
import { Province } from 'src/province/province.entities';
import { SpecialtyDetails } from 'src/specialty-details/specialty-details.entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('specialty')
export class Specialty {
  @PrimaryGeneratedColumn('uuid')
  specialty_id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => Province, province => province.specialty)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @OneToMany(() => SpecialtyDetails, specialtydetails => specialtydetails.Specialty)
  specialtydetails: SpecialtyDetails[];

  @OneToOne(() => Favorites, favorites => favorites.account)
  @JoinColumn({ name: 'specialty_id'})
  favorites: Favorites;
}
