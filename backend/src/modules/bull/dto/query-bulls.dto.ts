import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryBullsDto {
  @ApiProperty({ example: 1, description: 'Page number', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ example: 10, description: 'Limit', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ example: 'search', description: 'Search term', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: 'propio', description: 'Origin', enum: ['propio', 'catalogo', 'favoritos'], required: false })
  @IsOptional()
  @IsIn(['propio', 'catalogo', 'favoritos'])
  origin?: 'propio' | 'catalogo' | 'favoritos';

  @ApiProperty({ example: 'vaquillona', description: 'Usage', enum: ['vaquillona', 'vaca'], required: false })
  @IsOptional()
  @IsIn(['vaquillona', 'vaca'])
  usage?: 'vaquillona' | 'vaca';

  @ApiProperty({ example: 'negro', description: 'Coat color', enum: ['negro', 'colorado'], required: false })
  @IsOptional()
  @IsIn(['negro', 'colorado'])
  @Transform(({ value }) => value?.toLowerCase())
  coatColor?: 'negro' | 'colorado';

  @ApiProperty({ example: 'asc', description: 'Sort order', enum: ['asc', 'desc'], required: false })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  @Transform(({ value }) => value?.toLowerCase())
  sort?: 'asc' | 'desc';
}
