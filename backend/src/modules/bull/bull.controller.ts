import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BullService } from './bull.service';
import { QueryBullsDto } from './dto/query-bulls.dto';
import { Bull } from './entities/bull.entity';

@ApiTags('Bulls')
@ApiBearerAuth('JWT-auth')
@Controller('bulls')
export class BullController {
  constructor(private readonly bullService: BullService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a bull by ID' })
  @ApiParam({ name: 'id', description: 'Bull UUID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Bull found',
    type: Bull
  })
  @ApiResponse({ status: 404, description: 'Bull not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  getBullById(@Param('id') id: string) {
    return this.bullService.findOneById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search and filter bulls with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Bulls retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            earTag: '992',
            name: 'Toro Black Emerald',
            breed: 'Angus',
            coatColor: 'negro',
            origin: 'propio',
            usage: 'vaquillona',
            ageMonths: 36,
            featuredTrait: 'Top 1% calving ease',
            growth: 85,
            calvingEase: 98,
            reproduction: 75,
            moderation: 60,
            carcass: 82,
            bullScore: 82.65,
            isFavorite: true
          }
        ],
        total: 8,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  searchBulls(@Query() queryDto: QueryBullsDto, @Request() req) {
    return this.bullService.searchBulls(queryDto, req.user?.userId);
  }
}
