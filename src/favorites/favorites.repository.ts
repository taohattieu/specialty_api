import { EntityRepository, Repository } from 'typeorm';
import { FavoritesEntity } from './favorites.entities';

@EntityRepository(FavoritesEntity)
export class FavoritesRepository extends Repository<FavoritesEntity> {}
