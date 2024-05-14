import { EntityRepository, Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entities';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {}
