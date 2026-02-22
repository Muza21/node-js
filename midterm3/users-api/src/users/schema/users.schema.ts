import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, lowercase: true })
  fullName: string;

  @Prop({ type: String, required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ type: Number, required: true, index: true })
  age: number;

  @Prop({ type: String, required: true, enum: ['m', 'f'], index: true })
  gender: 'm' | 'f';
}

export const userModel = SchemaFactory.createForClass(User);
