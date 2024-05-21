import { Controller, Get, Post, Delete, Body, Query, Param, UseGuards, Req } from '@nestjs/common';
import { CreateFavoritesDto } from './favorites.dto';
import { AuthGuard } from '@nestjs/passport';
import { FavoritesService } from './favorites.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('favorites')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
@UseGuards(JwtAuthGuard)
create(@Req() req, @Body() createFavoritesDto: CreateFavoritesDto) {
  const userId = req.user.account_id;
  return this.favoritesService.create(createFavoritesDto, userId); // Truyền userId
}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllByAccountId(@Query('account_id') account_id: string) {
    return this.favoritesService.findAllByAccountId(account_id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Query('account_id') account_id: string, @Query('specialty_id') specialty_id: string) {
    return this.favoritesService.remove(account_id, specialty_id);
  }
}
