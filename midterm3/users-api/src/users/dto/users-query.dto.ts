/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';

const toInt = ({ value }: { value: unknown }) => {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

export class UsersQueryDto {
  @IsOptional()
  @IsIn(['m', 'f'])
  gender?: 'm' | 'f';

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  @Max(120)
  ageFrom?: number;

  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  @Max(120)
  ageTo?: number;

  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
