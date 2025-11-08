const { Router } = require("express");

const ExpenseController = require("../controllers/expense.controller");
const validateExpense = require("../middlewares/validateExpense");
const validateSecret = require("../middlewares/validateSecret");

const expenseRouter = Router();

expenseRouter.get("/", ExpenseController.getExpenses);
expenseRouter.post("/", validateExpense, ExpenseController.postExpense);
expenseRouter.get("/:id", ExpenseController.getExpense);
expenseRouter.patch("/:id", ExpenseController.updateExpense);
expenseRouter.delete("/:id", validateSecret, ExpenseController.deleteExpense);

module.exports = expenseRouter;
