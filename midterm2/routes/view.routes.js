const express = require("express");
const router = express.Router();
const { readFile } = require("../utils.js");

router.get("/", async (req, res) => {
  const { category } = req.query;
  let expenses = await readFile("expenses.json", true);
  if (category) {
    expenses = expenses.filter((ex) =>
      ex.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  res.render("pages/home.ejs", { expenses });
});

router.get("/create", (req, res) => {
  res.render("pages/create.ejs");
});

router.get("/expenses/:id", async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const expense = expenses.find((u) => u.id === id);
  res.render("pages/details.ejs", { expense });
});

router.get("/expenses/:id/details", async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const expense = expenses.find((u) => u.id === id);
  res.render("pages/update.ejs", { expense });
});

module.exports = router;
