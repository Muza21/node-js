import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { type ExpenseCategory, KNOW_CATEGORIES } from '../expense.contants';

@Schema({ timestamps: true })
export class Expense {
  @Prop({ type: String, required: true, enum: KNOW_CATEGORIES })
  category: ExpenseCategory;

  @Prop({ type: String, required: true, trim: true })
  productName: string;

  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Number, required: true, min: 0 })
  totalPrice: number;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'user' })
  user: mongoose.Types.ObjectId;
}

export const expenseModel = SchemaFactory.createForClass(Expense);

expenseModel.pre('validate', function () {
  if (typeof this.price === 'number' && typeof this.quantity === 'number') {
    this.totalPrice = this.price * this.quantity;
  }
});
