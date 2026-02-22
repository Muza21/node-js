import { Injectable, OnModuleInit, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { UserDocument } from './schema/users.schema';
import { UsersQueryDto } from './dto/users-query.dto';
import { UserFilter } from './types/user-filter.type';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const usersCount = await this.userModel.countDocuments();

    if (usersCount === 0) {
      const TOTAL = 30_000;
      const BATCH_SIZE = 5_000;

      let batch: Array<{
        fullName: string;
        age: number;
        gender: 'm' | 'f';
        email: string;
      }> = [];

      for (let i = 0; i < TOTAL; i++) {
        batch.push({
          fullName: faker.person.fullName(),
          age: faker.number.int({ min: 15, max: 90 }),
          gender: faker.helpers.arrayElement(['m', 'f']),
          email: faker.internet.email().toLowerCase(),
        });

        if (batch.length === BATCH_SIZE) {
          await this.userModel.insertMany(batch, { ordered: false });
          batch = [];
        }
      }

      if (batch.length) {
        await this.userModel.insertMany(batch, { ordered: false });
      }
    }
  }

  async totalUsers() {
    const total = await this.userModel.countDocuments();
    return { total };
  }

  async findAll(query: UsersQueryDto) {
    const filter: UserFilter = {};

    if (query.gender) filter.gender = query.gender;

    if (query.name?.trim()) {
      filter.fullName = new RegExp(query.name.trim(), 'i');
    }

    if (query.age !== undefined) {
      filter.age = query.age;
    } else if (query.ageFrom !== undefined || query.ageTo !== undefined) {
      const range: { $gte?: number; $lte?: number } = {};
      if (query.ageFrom !== undefined) range.$gte = query.ageFrom;
      if (query.ageTo !== undefined) range.$lte = query.ageTo;

      if (
        query.ageFrom !== undefined &&
        query.ageTo !== undefined &&
        query.ageFrom > query.ageTo
      ) {
        throw new BadRequestException('ageFrom must be <= ageTo');
      }

      filter.age = range;
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit).lean(),
      this.userModel.countDocuments(filter),
    ]);

    return { page, limit, total, items };
  }
}
