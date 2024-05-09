import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './favorites.entities';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
  ) {}

//   async addToFavorites(account_id: string, specialty_id: string): Promise<FavoritesEntity> {
//     const newFavorite = this.favoritesRepository.create({
//       account_id,
//       specialty_id,
//       createdAt: new Date().toISOString(),
//     });
//     return await this.favoritesRepository.save(newFavorite);
//   }
}
