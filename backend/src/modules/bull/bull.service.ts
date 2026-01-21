import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { QueryBullsDto } from './dto/query-bulls.dto';
import { Bull } from './entities/bull.entity';

@Injectable()
export class BullService {
  constructor(
    @InjectRepository(Bull)
    private readonly bullRepository: Repository<Bull>,
  ) {}

  async findOneById(id: string){
    return this.bullRepository.findOne({ where: { id } });
  }

  async searchBulls(queryDto: QueryBullsDto, userId?: string) {
    // Special case: favoritos requires JOIN with user_favorites
    if (queryDto.origin === 'favoritos') {
      return await this.findFavorites(queryDto, userId);
    }

    // Normal case: use Repository methods
    let where: FindOptionsWhere<Bull> | FindOptionsWhere<Bull>[] = {};

    // Apply simple filters
    if (queryDto.origin) {
      where.origin = queryDto.origin;
    }

    if (queryDto.usage) {
      where.usage = queryDto.usage;
    }

    if (queryDto.coatColor) {
      where.coatColor = queryDto.coatColor;
    }

    // Search requires OR condition (earTag OR name)
    if (queryDto.search) {
      const searchPattern = ILike(`%${queryDto.search}%`);
      const baseWhere = { ...where };
      where = [
        { ...baseWhere, earTag: searchPattern },
        { ...baseWhere, name: searchPattern },
      ];
    }

    // Execute query with pagination and sorting
    const page = queryDto.page ?? 1;
    const limit = queryDto.limit ?? 10;

    const [bulls, total] = await this.bullRepository.findAndCount({
      where,
      order: {
        bullScore: queryDto.sort?.toUpperCase() as 'ASC' | 'DESC' || 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Add isFavorite field
    const bullsWithFavorite = await this.addIsFavoriteField(bulls, userId);

    return {
      data: bullsWithFavorite,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private async findFavorites(queryDto: QueryBullsDto, userId?: string) {
    const page = queryDto.page ?? 1;
    const limit = queryDto.limit ?? 10;

    if (!userId) {
      return {
        data: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }

    const queryBuilder = this.bullRepository
      .createQueryBuilder('bull')
      .innerJoin('user_favorites', 'fav', 'fav.bull_id = bull.id')
      .where('fav.user_id = :userId', { userId });

    // Apply other filters
    if (queryDto.coatColor) {
      queryBuilder.andWhere('bull.coatColor = :coatColor', {
        coatColor: queryDto.coatColor,
      });
    }
    if (queryDto.usage) {
      queryBuilder.andWhere('bull.usage = :usage', { usage: queryDto.usage });
    }
    if (queryDto.search) {
      queryBuilder.andWhere(
        '(bull.earTag ILIKE :search OR bull.name ILIKE :search)',
        { search: `%${queryDto.search}%` },
      );
    }

    // Apply sorting
    queryBuilder.orderBy(
      'bull.bullScore',
      queryDto.sort?.toUpperCase() as 'ASC' | 'DESC' || 'DESC',
    );

    // Apply pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [bulls, total] = await queryBuilder.getManyAndCount();

    // All bulls in this query are favorites
    const bullsWithFavorite = bulls.map((bull) => ({
      ...bull,
      isFavorite: true,
    }));

    return {
      data: bullsWithFavorite,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private async addIsFavoriteField(bulls: Bull[], userId?: string) {
    if (!userId) {
      return bulls.map((bull) => ({ ...bull, isFavorite: false }));
    }

    const favoriteIds = await this.getFavoriteIds(userId);
    return bulls.map((bull) => ({
      ...bull,
      isFavorite: favoriteIds.includes(bull.id),
    }));
  }

  private async getFavoriteIds(userId: string): Promise<string[]> {
    const result = await this.bullRepository.query(
      'SELECT bull_id FROM user_favorites WHERE user_id = $1',
      [userId],
    );
    return result.map((row: { bull_id: string }) => row.bull_id);
  }
}
