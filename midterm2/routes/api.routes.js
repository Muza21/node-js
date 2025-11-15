const express = require("express");
const router = express.Router();
const { readFile, writeFile } = require("../utils");

router.post("/expenses", async (req, res) => {
  const { category, price } = req.body;
  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;
  const newExpense = {
    id: lastId + 1,
    category,
    price: Number(price),
  };
  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);
  res.redirect("/");
});

router.get("/expenses/:id/delete", async (req, res) => {
  const id = Number(req.params.id);
  let expenses = await readFile("expenses.json", true);
  expenses = expenses.filter((e) => e.id !== id);
  await writeFile("expenses.json", expenses);
  res.redirect("/");
});

router.post("/expenses/:id/update", async (req, res) => {
  const id = Number(req.params.id);
  const { category, price } = req.body;
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((e) => e.id === id);
  expenses[index] = {
    ...expenses[index],
    category,
    price: Number(price),
  };
  await writeFile("expenses.json", expenses);
  res.redirect("/");
});

module.exports = router;
