import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Bull } from '../bull/entities/bull.entity';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bull])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
