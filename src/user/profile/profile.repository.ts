import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entities';

export class ProfileRepository extends Repository<ProfileEntity> {}
