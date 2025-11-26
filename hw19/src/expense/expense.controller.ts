import { Request, Response } from "express";
import ExpenseService from "./expense.service";

const index = async (req: Request, res: Response) => {
  try {
    const expenses = await ExpenseService.getExpenses();
    return res.status(200).json(expenses);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const expense = await ExpenseService.getExpenseById(id);
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      return res.status(200).json(expense);
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const store = async (req: Request, res: Response) => {
  try {
    const created = await ExpenseService.createExpense(req.body);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const updated = await ExpenseService.updateExpense(id, req.body);

      if (!updated) {
        return res.status(404).json({ message: "Expense not found" });
      }

      return res.status(200).json(updated);
    }
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const deleted = await ExpenseService.deleteExpense(id);

      if (!deleted) {
        return res.status(404).json({ message: "Expense not found" });
      }

      return res.status(200).json({ message: "Deleted successfully" });
    }
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export default { index, show, store, update, destroy };
