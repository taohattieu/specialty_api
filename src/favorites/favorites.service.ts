import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './favorites.entities';
import { CreateFavoritesDto } from './favorites.dto';
import { AccountEntity } from 'src/user/account/entities/account.entities';
import { SpecialtyRepository } from 'src/specialty/specialty.repository';
import { SpecialtyEntity } from 'src/specialty/specialty.entities';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(FavoritesEntity)
        private favoritesRepository: Repository<FavoritesEntity>,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(SpecialtyRepository)
        private specialtyRepository: SpecialtyRepository,
    ) {}

    async create(createFavoritesDto: CreateFavoritesDto, userId: string): Promise<FavoritesEntity> {
      try {
          const account = await this.accountRepository.findOne({
              where: { account_id: userId },
              relations: ['favorites'],
          });
  
          const specialty = await this.specialtyRepository.findOne({
              where: { specialty_id: createFavoritesDto.specialty_id },
          });
  
          if (!account || !specialty) {
              throw new NotFoundException('Không tìm thấy tài khoản hoặc chuyên ngành');
          }
  
          const existingFavorite = account.favorites.find(favorite => favorite.specialty.specialty_id === createFavoritesDto.specialty_id);
          if (existingFavorite) {
              // Return existing favorite if it already exists
              return existingFavorite;
          }
  
          const newFavorite = new FavoritesEntity();
          newFavorite.account = account;
          newFavorite.specialty = specialty;
  
          return await this.favoritesRepository.save(newFavorite);
      } catch (error) {
          throw new InternalServerErrorException('Không thể tạo mục yêu thích', error.message);
      }
  }

  async findAllByAccountId(accountId: string): Promise<SpecialtyEntity[]> {
    try {
        const account = await this.accountRepository.findOne({
            where: { account_id: accountId },
            relations: ['favorites', 'favorites.specialty'],
        });

        if (!account) {
            throw new NotFoundException('Không tìm thấy tài khoản');
        }

        return account.favorites.map(favorite => favorite.specialty);
    } catch (error) {
        throw new InternalServerErrorException('Không thể truy xuất các mục yêu thích');
    }
}

async remove(accountId: string, specialtyId: string): Promise<void> {
  try {
      const account = await this.accountRepository.findOne({
          where: { account_id: accountId },
          relations: ['favorites'],
      });

      if (!account) {
          throw new NotFoundException('Không tìm thấy tài khoản');
      }

      account.favorites = account.favorites.filter(fav => fav.specialty.specialty_id !== specialtyId);
      await this.accountRepository.save(account);
  } catch (error) {
      throw new InternalServerErrorException('Không thể xóa mục yêu thích');
  }
}
}
