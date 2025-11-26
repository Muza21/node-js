import { Schema, model, Document } from "mongoose";

export interface IExpense extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const expenseSchema = new Schema<IExpense>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Expense = model<IExpense>("Expense", expenseSchema);
