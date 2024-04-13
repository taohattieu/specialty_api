import { Province } from 'src/province/province.entities';
import { Specialty } from 'src/specialty/specialty.entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('specialty details')
export class SpecialtyDetails {
  @PrimaryGeneratedColumn('uuid')
  specialtydetails_id: string;

  @Column()
  name: string;

  @Column()
  ingredient: string;

  @Column()
  origin: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne(() => Specialty, specialty => specialty.specialtydetails)
  @JoinColumn({ name: 'specialty_id' })
  Specialty: Specialty;
}
