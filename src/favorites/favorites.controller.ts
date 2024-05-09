import { Controller, Post, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

//   @Post()
//   async addToFavorites(
//     @Body('account_id') account_id: string,
//     @Body('specialty_id') specialty_id: string,
//   ) {
//     return await this.favoritesService.addToFavorites(account_id, specialty_id);
//   }
}
