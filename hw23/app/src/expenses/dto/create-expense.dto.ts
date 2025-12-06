import { IsString, IsNotEmpty, IsNumber, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { KNOW_CATEGORIES } from '../expense.contants';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(KNOW_CATEGORIES)
  category: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  price: number;
}
