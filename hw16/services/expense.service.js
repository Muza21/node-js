const ExpenseModel = require("../models/expense.model");

exports.getExpenses = async (query) => {
  const page = parseInt(query.page) || 1;
  let take = parseInt(query.take) || 10;
  const UPPER_LIMIT = 20;
  if (take > UPPER_LIMIT) take = UPPER_LIMIT;
  const skip = (page - 1) * take;

  const filter = {};
  if (query.category) {
    const categories = query.category.split(",").map((c) => c.trim());
    filter.category = { $in: categories };
  }

  if (query.amountFrom || query.amountTo) {
    filter.price = {};
    if (query.amountFrom) filter.price.$gte = Number(query.amountFrom);
    if (query.amountTo) filter.price.$lte = Number(query.amountTo);
  }

  const expenses = await ExpenseModel.find(filter).skip(skip).limit(take);

  return expenses;
};

exports.postExpense = async (price, category) => {
  await ExpenseModel.create({
    price,
    category,
  });
};

exports.getExpense = async (id) => {
  const expense = await ExpenseModel.findById(id).exec();

  return expense;
};

exports.updateExpense = async (id, price, category) => {
  const updateReq = {};
  updateReq.price = price;
  updateReq.category = category;

  const updatedExpense = await ExpenseModel.findByIdAndUpdate(id, updateReq, {
    new: true,
  });

  return updatedExpense;
};

exports.deleteExpense = async (id) => {
  const deletedExpense = await ExpenseModel.findByIdAndDelete(id);
  return deletedExpense;
};

exports.getTopFiveExpenses = async () => {
  const expenses = await ExpenseModel.find().sort({ price: -1 }).limit(5);

  return expenses;
};
