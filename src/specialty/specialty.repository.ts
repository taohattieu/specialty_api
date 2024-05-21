import { EntityRepository, Repository } from 'typeorm';
import { SpecialtyEntity } from './specialty.entities';

@EntityRepository(SpecialtyEntity)
export class SpecialtyRepository extends Repository<SpecialtyEntity> {}