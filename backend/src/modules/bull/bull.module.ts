import { Module } from '@nestjs/common';
import { BullService } from './bull.service';
import { BullController } from './bull.controller';

@Module({
  controllers: [BullController],
  providers: [BullService],
})
export class BullModule {}
