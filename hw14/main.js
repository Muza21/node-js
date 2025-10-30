// 1) შექმენით ხარჯების(expenses) ქრადი ექსპრესის გამოყენებით.

// 2) დაამატეთ ფეჯინეიშენის ფიჩერი, /expenses?page=1&take=30 უნდა დააბურნოს 30 ჩანაწერი, გაითვალისწინეთ ზედა ზღვარზე შეზღუდვა

// 3) დაამატეთ ვალიდაცია წაშლის დროს, უზერმა უნდა შეძლოს ხარჯის წაშლა მხოლოდ მაშინ თუ ჰედერში გამოატანს რაიმე კოდურ სიტყვას მაგალითად secret=random123

// 4) გაჰენდლეთ ერორები, ყველა ენდოითნზე როდესაც კლიენტი არასწორ ინფორმაციას გამოატანს გაუზაგვნეთ შესაბამისი სტატუს კოდები,

// გამოიყენეთ FS მოდული და ExpressJS, ხარჯები უნდა შეინახოტ expenses.json ფაილში

const express = require("express");
const { readFile, writeFile } = require("./utils");
const app = express();

app.use(express.json());

app.get("/expenses", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let take = parseInt(req.query.take) || 10;
  const UPPER_LIMIT = 20;
  if (take > UPPER_LIMIT) take = UPPER_LIMIT;
  const expenses = await readFile("expenses.json", true);
  const start = (page - 1) * take;
  const paginated = expenses.slice(start, start + take);
  return res.status(200).json(paginated);
});

app.post("/expenses", async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;
  const { price, category } = req.body;
  if (price == null || isNaN(price)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid price field" });
  }
  if (!category) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid category field" });
  }
  const expense = {
    id: lastId + 1,
    category,
    price,
    createdAt: new Date().toISOString(),
  };
  expenses.push(expense);
  await writeFile("expenses.json", expenses);
  return res.status(201).json("created succesfully");
});

app.get("/expenses/:id", async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: true, message: "expense not found" });
  }
  res.json(expenses[index]);
});

app.patch("/expenses/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { price, category } = req.body;
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: true, message: "expense not found" });
  }
  if (price == null || isNaN(price)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid price field" });
  }
  if (!category) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid category field" });
  }
  const updateReq = {};
  updateReq["price"] = price;
  updateReq["category"] = category;
  expenses[index] = {
    ...expenses[index],
    ...updateReq,
  };
  await writeFile("expenses.json", expenses);
  return res.status(200).json("updated succesfully");
});

app.delete("/expenses/:id", async (req, res) => {
  const secret = req.headers["secret"];
  if (secret !== "secret-token") {
    return res.status(403).json({ error: true, message: "Access denied" });
  }
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: true, message: "expense not found" });
  }
  expenses.splice(index, 1);
  await writeFile("expenses.json", expenses);
  return res.status(200).json({ message: "Deleted successfully" });
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
