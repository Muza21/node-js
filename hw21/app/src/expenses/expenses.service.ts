import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './expense.interface';
import { QueryParamsDTO } from './dto/pagination.dto';
import { ExpenseQueryDTO } from './dto/expense-query.dto';

@Injectable()
export class ExpensesService {
  private expenses: Expense[] = [];

  getAllExpenses(query: ExpenseQueryDTO & QueryParamsDTO) {
    const { category, priceFrom, priceTo, page = 1, take = 30 } = query;

    let data = [...this.expenses];
    console.log(category);
    if (category) data = data.filter((e) => e.category === category);
    if (priceFrom !== undefined)
      data = data.filter((e) => e.price >= Number(priceFrom));
    if (priceTo !== undefined)
      data = data.filter((e) => e.price <= Number(priceTo));
    console.log(data, 'data');
    console.log(take, page);
    const start = (page - 1) * take;
    const end = page * take;
    const pagedData = data.slice(start, end);

    return {
      page,
      take,
      total: data.length,
      expenses: pagedData,
    };
  }

  getExpenseById(id: number): Expense {
    const expense = this.expenses.find((e) => e.id === id);
    if (!expense) {
      throw new NotFoundException('expense not found');
    }
    return expense;
  }

  createExpense(createExpenseDto: CreateExpenseDto): Expense {
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      ...createExpenseDto,
      totalPrice: createExpenseDto.price * createExpenseDto.quantity,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  updateExpense(id: number, updateExpenseDto: UpdateExpenseDto): Expense {
    const expense = this.getExpenseById(id);
    const updateReq: Expense = { ...expense };
    let shouldRecalculateTotal = false;
    if (updateExpenseDto.category)
      updateReq.category = updateExpenseDto.category;
    if (updateExpenseDto.productName)
      updateReq.productName = updateExpenseDto.productName;
    if (updateExpenseDto.quantity) {
      updateReq.quantity = updateExpenseDto.quantity;
      shouldRecalculateTotal = true;
    }
    if (updateExpenseDto.price) {
      updateReq.price = updateExpenseDto.price;
      shouldRecalculateTotal = true;
    }
    if (shouldRecalculateTotal) {
      updateReq.totalPrice = updateReq.quantity * updateReq.price;
    }
    const index = this.expenses.findIndex((e) => e.id === id);
    this.expenses[index] = updateReq;

    return updateReq;
  }

  deleteExpense(id: number) {
    const index = this.expenses.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('Expense not found');
    }
    this.expenses.splice(index, 1);
  }
}
