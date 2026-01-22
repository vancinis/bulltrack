import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Bull } from '../bull/entities/bull.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bull)
    private readonly bullRepository: Repository<Bull>,
  ) {}

  async addFavorite(userId: string, bullId: string) {
    // Load user with favorites
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify bull exists
    const bull = await this.bullRepository.findOne({
      where: { id: bullId },
    });

    if (!bull) {
      throw new NotFoundException('Bull not found');
    }

    // Check if already favorited
    const alreadyFavorited = user.favorites.some(fav => fav.id === bullId);
    if (alreadyFavorited) {
      return { message: 'Bull already in favorites', bullId };
    }

    // Add to favorites
    user.favorites.push(bull);
    await this.userRepository.save(user);

    return { message: 'Bull added to favorites', bullId };
  }

  async removeFavorite(userId: string, bullId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Filter out the bull
    const initialLength = user.favorites.length;
    user.favorites = user.favorites.filter(fav => fav.id !== bullId);

    if (initialLength === user.favorites.length) {
      return { message: 'Bull was not in favorites', bullId };
    }

    await this.userRepository.save(user);
    return { message: 'Bull removed from favorites', bullId };
  }

  async getUserFavorites(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Return favorites with isFavorite: true since these are all favorites
    return user.favorites.map(bull => ({
      ...bull,
      isFavorite: true,
    }));
  }
}
