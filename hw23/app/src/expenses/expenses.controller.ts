import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { QueryParamsDTO } from './dto/pagination.dto';
import { ExpenseQueryDTO } from './dto/expense-query.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}
  @Get()
  getAllExpenses(@Query() query: ExpenseQueryDTO & QueryParamsDTO) {
    return this.expensesService.getAllExpenses(query);
  }

  @Get(':id')
  getExpenseById(@Param('id') id: string) {
    return this.expensesService.getExpenseById(Number(id));
  }

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Patch(':id')
  updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpense(Number(id), updateExpenseDto);
  }

  @Delete(':id')
  deleteExpense(@Param('id') id: string) {
    return this.expensesService.deleteExpense(Number(id));
  }
}
