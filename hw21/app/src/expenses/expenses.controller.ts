import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}
  @Get()
  getAllExpenses() {
    return this.expensesService.getAllExpenses();
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
