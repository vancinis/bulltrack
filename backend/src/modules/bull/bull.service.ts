import { Injectable } from '@nestjs/common';
import { CreateBullDto } from './dto/create-bull.dto';
import { UpdateBullDto } from './dto/update-bull.dto';

@Injectable()
export class BullService {
  create(createBullDto: CreateBullDto) {
    return 'This action adds a new bull';
  }

  findAll() {
    return `This action returns all bull`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bull`;
  }

  update(id: number, updateBullDto: UpdateBullDto) {
    return `This action updates a #${id} bull`;
  }

  remove(id: number) {
    return `This action removes a #${id} bull`;
  }
}
