import { Module, forwardRef } from '@nestjs/common'; // Import forwardRef
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './favorites.entities';
import { AuthModule } from 'src/user/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from 'src/user/account/account.module';
import { SpecialtyModule } from 'src/specialty/specialty.module';
import { AccountEntity } from 'src/user/account/entities/account.entities'; // Import AccountEntity
import { FavoritesRepository } from './favorites.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity, AccountEntity]), // Thêm AccountEntity vào đây
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    // forwardRef(() => AccountModule),
    // forwardRef(() => SpecialtyModule),
    AccountModule,
    SpecialtyModule
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesRepository]
})
export class FavoritesModule {}