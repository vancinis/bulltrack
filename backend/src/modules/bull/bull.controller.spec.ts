import { Test, TestingModule } from '@nestjs/testing';
import { BullController } from './bull.controller';
import { BullService } from './bull.service';

describe('BullController', () => {
  let controller: BullController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BullController],
      providers: [BullService],
    }).compile();

    controller = module.get<BullController>(BullController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
