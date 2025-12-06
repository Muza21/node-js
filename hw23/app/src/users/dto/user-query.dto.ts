import { IsOptional, IsString } from 'class-validator';

export class UserQueryDto {
  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
