import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, trim: true })
  firstName: string;

  @Prop({ type: String, required: true, trim: true })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  phoneNumber: string;

  @Prop({ type: String, required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({ type: Date, required: true })
  subscriptionStartDate: Date;

  @Prop({ type: Date, required: true })
  subscriptionEndDate: Date;
}

export const userModel = SchemaFactory.createForClass(User);
