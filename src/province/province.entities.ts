
import { Regions } from 'src/regions/regions.entities';
import { SpecialtyEntity } from 'src/specialty/specialty.entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('province')
export class Province {
  @PrimaryGeneratedColumn('uuid')
  province_id: string;

  @Column()
  name: string;

  @Column()
  image: string

  @Column()
  description: string;

  @OneToMany(() => SpecialtyEntity, specialty => specialty.province)
  specialty: SpecialtyEntity[];

  @ManyToOne(() => Regions, regions => regions.province)
  @JoinColumn({ name: 'regions_id' })
  regions: Regions;

  @Column()
  regions_id: string


}
