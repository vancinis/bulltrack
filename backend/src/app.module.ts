import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BullModule } from './modules/bull/bull.module';
import { UserModule } from './modules/user/user.module';
import { FavoriteModule } from './modules/favorite/favorite.module';

@Module({
  imports: [AuthModule, BullModule, UserModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
