import { IsOptional, IsIn, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { KNOW_CATEGORIES } from '../expense.contants';

export class ExpenseQueryDTO {
  @IsOptional()
  @IsIn(KNOW_CATEGORIES)
  category?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  priceFrom?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  priceTo?: number;
}
