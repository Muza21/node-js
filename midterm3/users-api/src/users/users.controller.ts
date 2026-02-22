import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersQueryDto } from './dto/users-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('total-users')
  totalUsers() {
    return this.usersService.totalUsers();
  }

  @Get()
  findAll(@Query() query: UsersQueryDto) {
    return this.usersService.findAll(query);
  }
}
