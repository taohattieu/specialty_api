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

  // async addToFavorites(account_id: string, specialty_id: string): Promise<FavoritesEntity> {
  //   // Tạo một instance mới của FavoritesEntity với các giá trị được cung cấp
  //   const newFavorite = this.favoritesRepository.create({
  //     account_id,
  //     specialty_id,
  //     createdAt: new Date().toISOString(), // Thêm createdAt với giá trị thời gian hiện tại
  //   });
  
  //   // Lưu instance mới vào cơ sở dữ liệu và trả về nó
  //   return await this.favoritesRepository.save(newFavorite);
  // }
  
}
