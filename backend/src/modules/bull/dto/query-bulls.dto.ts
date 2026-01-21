import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryBullsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['propio', 'catalogo', 'favoritos'])
  origin?: 'propio' | 'catalogo' | 'favoritos';

  @IsOptional()
  @IsIn(['vaquillona', 'vaca'])
  usage?: 'vaquillona' | 'vaca';

  @IsOptional()
  @IsIn(['negro', 'colorado'])
  @Transform(({ value }) => value?.toLowerCase())
  coatColor?: 'negro' | 'colorado';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @Transform(({ value }) => value?.toLowerCase())
  sort?: 'asc' | 'desc';
}
