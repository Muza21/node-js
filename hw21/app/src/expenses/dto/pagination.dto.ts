import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class QueryParamsDTO {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Max(30)
  take: number = 30;
}
