const ExpenseService = require("../services/expense.service");

exports.getExpenses = async (req, res) => {
  const query = req.query;
  const expenses = await ExpenseService.getExpenses(query);

  return res.status(200).json(expenses);
};

exports.postExpense = async (req, res) => {
  const { price, category } = req.body;
  await ExpenseService.postExpense(price, category);
  return res.status(201).json("created succesfully");
};

exports.getExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await ExpenseService.getExpense(id);
  if (!expense) {
    return res.status(404).json({ error: true, message: "expense not found" });
  }

  return res.status(200).json(expense);
};

exports.updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const { price, category } = req.body;

  if (price !== undefined && (isNaN(price) || price == null)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid price field" });
  }
  if (category !== undefined && !category.trim()) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid category field" });
  }

  const expense = await ExpenseService.updateExpense(id, price, category);
  if (!expense) {
    return res.status(404).json({ error: true, message: "expense not found" });
  }
  return res.status(200).json("updated succesfully");
};

exports.deleteExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await ExpenseService.deleteExpense(id);
  if (!expense) {
    return res.status(404).json({ error: true, message: "expense not found" });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};
