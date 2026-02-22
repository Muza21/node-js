import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './schema/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
