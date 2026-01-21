import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BullService } from './bull.service';
import { CreateBullDto } from './dto/create-bull.dto';
import { UpdateBullDto } from './dto/update-bull.dto';

@Controller('bull')
export class BullController {
  constructor(private readonly bullService: BullService) {}

  @Post()
  create(@Body() createBullDto: CreateBullDto) {
    return this.bullService.create(createBullDto);
  }

  @Get()
  findAll() {
    return this.bullService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bullService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBullDto: UpdateBullDto) {
    return this.bullService.update(+id, updateBullDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bullService.remove(+id);
  }
}
