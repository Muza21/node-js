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

  getAllUsers(query?: { gender?: string; email?: string }): User[] {
    const { gender, email } = query || {};
    const hasFilter =
      (typeof gender === 'string' && gender.trim() !== '') ||
      (typeof email === 'string' && email.trim() !== '');
    if (!hasFilter) {
      return this.users;
    }
    const filteredByGender = gender
      ? this.users.filter((u) => u.gender === gender)
      : [];

    const filteredByEmail = email
      ? this.users.filter((u) =>
          u.email.toLowerCase().startsWith(email.toLowerCase()),
        )
      : [];

    const combined = [...filteredByGender, ...filteredByEmail];
    const seenIds = new Set<number>();
    const result: User[] = [];
    combined.forEach((user) => {
      if (!seenIds.has(user.id)) {
        seenIds.add(user.id);
        result.push(user);
      }
    });

    return result;
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
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
    const newUser = {
      id: lastId + 1,
      ...createUserDto,
      subscriptionStartDate,
      subscriptionEndDate,
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

  findByEmail(email: string) {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  }

  upgradeSubscription(email: string): User {
    if (!email) {
      throw new BadRequestException('email is required');
    }
    const user = this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const currentEndDate = new Date(user.subscriptionEndDate);
    currentEndDate.setMonth(currentEndDate.getMonth() + 1);
    user.subscriptionEndDate = currentEndDate;
    return user;
  }
}
