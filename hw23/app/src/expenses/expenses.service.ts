import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './expense.interface';
import { QueryParamsDTO } from './dto/pagination.dto';
import { ExpenseQueryDTO } from './dto/expense-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type PriceRange = { $gte?: number; $lte?: number };

type ExpenseFilter = {
  category?: string;
  price?: PriceRange;
};

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('expense') private readonly expenseModel: Model<Expense>,
    @InjectModel('user') private readonly userModel: Model<any>,
  ) {}

  async getAllExpenses(query: ExpenseQueryDTO & QueryParamsDTO) {
    const { category, priceFrom, priceTo, page = 1, take = 30 } = query;

    const filter: ExpenseFilter = {};

    if (category) filter.category = category;

    const price: PriceRange = {};
    if (priceFrom !== undefined) price.$gte = Number(priceFrom);
    if (priceTo !== undefined) price.$lte = Number(priceTo);

    if (price.$gte !== undefined || price.$lte !== undefined) {
      filter.price = price;
    }

    const skip = (Number(page) - 1) * Number(take);

    const [total, expenses] = await Promise.all([
      this.expenseModel.countDocuments(filter),
      this.expenseModel
        .find(filter)
        .skip(skip)
        .limit(Number(take))
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    return { page: Number(page), take: Number(take), total, expenses };
  }

  async getExpenseById(id: string) {
    const expense = await this.expenseModel.findById(id).lean();
    if (!expense) throw new NotFoundException('expense not found');
    return expense;
  }

  async createExpense(createExpenseDto: CreateExpenseDto) {
    if (createExpenseDto.user) {
      const userId = createExpenseDto.user;
      const userExists = await this.userModel.exists({ _id: userId });
      if (!userExists) throw new BadRequestException('user not found');
    }

    const created = await this.expenseModel.create({
      ...createExpenseDto,
      totalPrice: createExpenseDto.price * createExpenseDto.quantity,
    });

    return created;
  }

  async updateExpense(id: string, updateExpenseDto: UpdateExpenseDto) {
    const existing = await this.expenseModel.findById(id);
    if (!existing) throw new NotFoundException('expense not found');

    if (updateExpenseDto.category)
      existing.category = updateExpenseDto.category;
    if (updateExpenseDto.productName)
      existing.productName = updateExpenseDto.productName;
    if (updateExpenseDto.quantity !== undefined)
      existing.quantity = updateExpenseDto.quantity;
    if (updateExpenseDto.price !== undefined)
      existing.price = updateExpenseDto.price;

    existing.totalPrice = existing.price * existing.quantity;

    await existing.save();
    return existing.toObject();
  }

  async deleteExpense(id: string) {
    const deleted = await this.expenseModel.findByIdAndDelete(id).lean();
    if (!deleted) throw new NotFoundException('Expense not found');
    return deleted;
  }
}
