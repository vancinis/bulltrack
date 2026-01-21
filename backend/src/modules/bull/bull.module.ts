import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullController } from './bull.controller';
import { BullService } from './bull.service';
import { Bull } from './entities/bull.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bull])],
  controllers: [BullController],
  providers: [BullService],
  exports: [BullService],
})
export class BullModule {}
