import { Expense, IExpense } from "./expense.model";

const getExpenses = async (): Promise<IExpense[]> => {
  return await Expense.find();
};

const getExpenseById = async (id: string): Promise<IExpense | null> => {
  return await Expense.findById(id);
};

const createExpense = async (data: Partial<IExpense>): Promise<IExpense> => {
  return await Expense.create(data);
};

const updateExpense = async (
  id: string,
  data: Partial<IExpense>
): Promise<IExpense | null> => {
  return await Expense.findByIdAndUpdate(id, data, { new: true });
};

const deleteExpense = async (id: string): Promise<IExpense | null> => {
  return await Expense.findByIdAndDelete(id);
};

export default {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
