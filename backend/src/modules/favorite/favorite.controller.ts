import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Bull } from '../bull/entities/bull.entity';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorites')
@ApiBearerAuth('JWT-auth')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':bullId')
  @ApiOperation({ summary: 'Add a bull to user favorites' })
  @ApiParam({ name: 'bullId', description: 'Bull UUID to add to favorites', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 201,
    description: 'Bull added to favorites',
    schema: {
      example: {
        message: 'Bull added to favorites',
        bullId: '550e8400-e29b-41d4-a716-446655440000'
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Bull already in favorites',
    schema: {
      example: {
        message: 'Bull already in favorites',
        bullId: '550e8400-e29b-41d4-a716-446655440000'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Bull not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  addFavorite(@Param('bullId') bullId: string, @Request() req) {
    return this.favoriteService.addFavorite(req.user.userId, bullId);
  }

  @Delete(':bullId')
  @ApiOperation({ summary: 'Remove a bull from user favorites' })
  @ApiParam({ name: 'bullId', description: 'Bull UUID to remove from favorites', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Bull removed from favorites',
    schema: {
      example: {
        message: 'Bull removed from favorites',
        bullId: '550e8400-e29b-41d4-a716-446655440000'
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Bull was not in favorites',
    schema: {
      example: {
        message: 'Bull was not in favorites',
        bullId: '550e8400-e29b-41d4-a716-446655440000'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  removeFavorite(@Param('bullId') bullId: string, @Request() req) {
    return this.favoriteService.removeFavorite(req.user.userId, bullId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user favorite bulls' })
  @ApiResponse({
    status: 200,
    description: 'User favorites retrieved successfully',
    type: [Bull],
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          earTag: '992',
          name: 'Toro Black Emerald',
          breed: 'Angus',
          coatColor: 'negro',
          origin: 'propio',
          usage: 'vaquillona',
          ageMonths: 36,
          featuredTrait: 'Top 1% calving ease',
          growth: 85,
          calvingEase: 98,
          reproduction: 75,
          moderation: 60,
          carcass: 82,
          bullScore: 82.65,
          isFavorite: true
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  getUserFavorites(@Request() req) {
    return this.favoriteService.getUserFavorites(req.user.userId);
  }
}
