import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const lastId = this.users[this.users.length - 1]?.id || 0;
    Object.keys(createUserDto).forEach((key) => {
      if (!createUserDto[key]) {
        throw new BadRequestException(`${key} is required`);
      }
    });
    const newUser = {
      id: lastId + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found');
    }
    if (!updateUserDto) {
      throw new BadRequestException('No update data provided');
    }
    const updateReq = {};
    if (updateUserDto.firstName)
      updateReq['firstName'] = updateUserDto.firstName;
    if (updateUserDto.lastName) updateReq['lastName'] = updateUserDto.lastName;
    if (updateUserDto.email) updateReq['email'] = updateUserDto.email;
    if (updateUserDto.phoneNumber)
      updateReq['phoneNumber'] = updateUserDto.phoneNumber;
    if (updateUserDto.gender) updateReq['gender'] = updateUserDto.gender;

    this.users[index] = {
      ...this.users[index],
      ...updateReq,
    };

    return this.users[index];
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found');
    }
    this.users.splice(index, 1);
  }
}
