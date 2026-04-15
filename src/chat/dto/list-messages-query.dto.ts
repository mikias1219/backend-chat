import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListMessagesQueryDto {
  @ApiPropertyOptional({
    description: 'Load messages older than this message id (infinite scroll)',
  })
  @IsOptional()
  @IsString()
  before?: string;

  @ApiPropertyOptional({
    description: 'Load messages newer than this message id',
  })
  @IsOptional()
  @IsString()
  after?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 200, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  limit?: number;
}
