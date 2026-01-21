import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':bullId')
  addFavorite(@Param('bullId') bullId: string, @Request() req) {
    return this.favoriteService.addFavorite(req.user.userId, bullId);
  }

  @Delete(':bullId')
  removeFavorite(@Param('bullId') bullId: string, @Request() req) {
    return this.favoriteService.removeFavorite(req.user.userId, bullId);
  }

  @Get()
  getUserFavorites(@Request() req) {
    return this.favoriteService.getUserFavorites(req.user.userId);
  }
}
