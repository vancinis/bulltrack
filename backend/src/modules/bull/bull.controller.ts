import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BullService } from './bull.service';
import { QueryBullsDto } from './dto/query-bulls.dto';

@Controller('bulls')
export class BullController {
  constructor(private readonly bullService: BullService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getBullById(@Param('id') id: string) {
    return this.bullService.findOneById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  searchBulls(@Query() queryDto: QueryBullsDto, @Request() req) {
    return this.bullService.searchBulls(queryDto, req.user?.userId);
  }
}
