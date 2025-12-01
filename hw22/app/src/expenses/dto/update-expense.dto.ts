import { IsString, IsNumber, Min, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { KNOW_CATEGORIES } from '../expense.contants';

export class UpdateExpenseDto {
  @IsOptional()
  @IsString()
  @IsIn(KNOW_CATEGORIES)
  category?: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  price?: number;
}
