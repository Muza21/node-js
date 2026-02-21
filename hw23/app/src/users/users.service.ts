import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  async getAllUsers(query?: { gender?: string; email?: string }) {
    const filter: Record<string, any> = {};

    const gender = query?.gender?.trim();
    if (gender) filter.gender = gender;

    const email = query?.email?.trim();
    if (email) filter.email = new RegExp(`^${email}`, 'i');

    return this.userModel.find(filter).lean();
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const exists = await this.userModel
      .findOne({ email: createUserDto.email })
      .lean();
    if (exists) throw new BadRequestException('user already exists');

    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const created = await this.userModel.create({
      ...createUserDto,
      subscriptionStartDate,
      subscriptionEndDate,
    });

    return created;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('No update data provided');
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true })
      .lean();

    if (!updated) throw new NotFoundException('user not found');
    return updated;
  }

  async deleteUser(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id).lean();
    if (!deleted) throw new NotFoundException('user not found');
    return deleted;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).lean();
  }

  async upgradeSubscription(email: string) {
    if (!email) throw new BadRequestException('email is required');

    const user = await this.userModel.findOne({
      email: email.toLowerCase().trim(),
    });
    if (!user) throw new NotFoundException('user not found');

    const currentEndDate = new Date(user.subscriptionEndDate);
    currentEndDate.setMonth(currentEndDate.getMonth() + 1);

    user.subscriptionEndDate = currentEndDate;
    await user.save();

    return user.toObject();
  }
}
