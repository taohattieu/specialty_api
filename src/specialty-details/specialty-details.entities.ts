import { Province } from 'src/province/province.entities';
import { SpecialtyEntity } from 'src/specialty/specialty.entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('specialty details')
export class SpecialtyDetails {
  @PrimaryGeneratedColumn('uuid')
  specialtydetails_id: string;

  @Column()
  name: string;

  @Column({ type: 'longtext'})
  ingredient: string;

  @Column()
  origin: string;

  @Column()
  image: string;

  @Column({ type: 'longtext'})
  description: string;

  @ManyToOne(() => SpecialtyEntity, specialty => specialty.specialtydetails)
  @JoinColumn({ name: 'specialty_id' })
  Specialty: SpecialtyEntity;
    specialty_id: string;
}
