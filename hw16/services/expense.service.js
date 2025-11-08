const { readFile, writeFile } = require("../utils");

exports.getExpenses = async (query) => {
  const expenses = await readFile("expenses.json", true);
  const page = parseInt(query.page) || 1;
  let take = parseInt(query.take) || 10;
  const UPPER_LIMIT = 20;
  if (take > UPPER_LIMIT) take = UPPER_LIMIT;
  const start = (page - 1) * take;

  return expenses.slice(start, start + take);
};

exports.postExpense = async (price, category) => {
  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;
  const expense = {
    id: lastId + 1,
    category,
    price,
    createdAt: new Date().toISOString(),
  };
  expenses.push(expense);

  await writeFile("expenses.json", expenses);
};

exports.getExpense = async (id) => {
  const expenses = await readFile("expenses.json", true);
  const expense = expenses.find((e) => e.id === id);

  return expense;
};

exports.updateExpense = async (id, price, category) => {
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return null;
  }
  const updateReq = {};
  updateReq["price"] = price;
  updateReq["category"] = category;
  expenses[index] = {
    ...expenses[index],
    ...updateReq,
  };
  await writeFile("expenses.json", expenses);
  return expenses[index];
};

exports.deleteExpense = async (id) => {
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return null;
  }
  const expense = expenses.splice(index, 1)[0];
  await writeFile("expenses.json", expenses);
  return expense;
};
