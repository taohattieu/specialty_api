import { Province } from "src/province/province.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('regions')
export class Regions {
@PrimaryGeneratedColumn('uuid')
regions_id: string

@Column()
name: string

@OneToMany(() => Province, province => province.regions)
province: Province[];

}