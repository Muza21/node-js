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
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses(@Query() query: ExpenseQueryDTO & QueryParamsDTO) {
    return this.expensesService.getAllExpenses(query);
  }

  @Get(':id')
  getExpenseById(@Param() { id }: IsValidObjectId) {
    return this.expensesService.getExpenseById(id);
  }

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Patch(':id')
  updateExpense(
    @Param() { id }: IsValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpense(id, updateExpenseDto);
  }

  @Delete(':id')
  deleteExpense(@Param() { id }: IsValidObjectId) {
    return this.expensesService.deleteExpense(id);
  }
}
