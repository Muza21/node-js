#!/usr/bin/env node

// თქვენი ამოცანაა შექმნათ expense-cli commander-ის და fs მოდულის გამოყენებით.

// 1) უნდა გქონდეს CRUD ფუნქციონალი: შექმნა, წაკითხვა, განახლება, წაშლა, getById.
// ყოველ ხარჯს უნდა ჰქონდეს მინიმუმ 4 ველი: category, price, id, createdAt.
// ეს ველები სავალდებულოა, დანარჩენი სურვილისამებრ შეგიძლია დაამატო.
// გაითვალისწინეთ id და createdAt სისტემამ თავად უნდა მიანიჭოს.

// 2) დაამატეთ სორტირების ფუნქციონალი
// თუ გაუშვებ `expense-cli show --asc` ან `expense-cli show --desc`, უნდა დაგიბრუნოს ხარჯები დალაგებული createdAt-ის მიხედვით.

// 3) უნდა დაამატო კატეგორიის ფილტრი.
// მაგალითად `expense-cli show -c shopping` ან `expense-cli show --category shopping` უნდა აჩვენებდეს მხოლოდ იმ ხარჯებს, რომელთა კატეგორიაა shopping.

// 4) უნდა ჰქონდეს ძებნა თარიღით.
// მაგალითად `expense-cli search 2025-01-02` უნდა აბრუნებდეს ყველა ხარჯს 2025 წლის 2 იანვრისთვის.

// 5) უნდა ჰქონდეს ვალიდაცია შექმნისას.
// თუ ხარჯის თანხა ნაკლებია 10-ზე, პროგრამამ უნდა დააბრუნოს შეცდომა. ასევე დაამატეთ ფეჯინეიშენი.

import { Command } from "commander";
import { priceValidation, readFile, writeFile } from "./utils.js";

const file = "expenses.json";

const program = new Command();

program.name("Expense Cli").description("Expense CLI").version("1.0.0");

program
  .command("show")
  .description("This action shows expenses")
  .option("--asc", "Sort ascending")
  .option("--desc", "Sort descending")
  .option("-c, --category <category>", "Filter by category")
  .option("-p, --page <page>", "describe page", "1")
  .option("-t, --take <take>", "describe take", "10")
  .action(async (opts) => {
    const expenses = await readFile(file, true);
    if (opts.asc === true && opts.desc === true) {
      console.log(
        "can't provide both ascending and descending flags, choose only one!"
      );
      return;
    }
    const filtered = opts.category
      ? expenses.filter((expense) => expense.category === opts.category)
      : expenses;

    if (opts.asc === true) {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (opts.desc === true) {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    const page = Number(opts.page);
    const take = Number(opts.take);
    console.log(filtered.slice((page - 1) * take, take * page));
  });

program
  .command("add")
  .description("This action adds new expense")
  .argument("<category>", "expense category field")
  .argument("<price>", "expense price field")
  .action(async (category, price) => {
    const expenses = await readFile(file, true);
    const lastId = expenses[expenses.length - 1]?.id || 0;
    if (!priceValidation(price)) {
      console.log("Invalid price field");
      return;
    }

    const expense = {
      id: lastId + 1,
      category,
      price: Number(price),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expenses.push(expense);
    await writeFile(file, expenses);
    console.log(expense);
  });

program
  .command("delete")
  .description("This action deletes an expense")
  .argument("<id>", "unique expense id")
  .action(async (id) => {
    const expenses = await readFile(file, true);
    const index = expenses.findIndex((expense) => expense.id === Number(id));

    if (index === -1) {
      console.log("The expense does not exists to delete");
      return;
    }
    expenses.splice(index, 1);
    await writeFile(file, expenses);
    console.log("Deleted successfully");
  });

program
  .command("update")
  .description("this command updates an expense")
  .argument("<id>", "unique expense id")
  .option("-c, --category <category>", "category property", "")
  .option("-p, --price <price>", "price property", "")
  .action(async (id, { category, price }) => {
    const expenses = await readFile("expenses.json", true);
    const index = expenses.findIndex((el) => el.id === Number(id));
    if (index === -1) {
      console.log("Could not find an expense to update");
      return;
    }

    const updateReq = {};
    if (category) {
      updateReq["category"] = category;
    }

    if (price) {
      if (!priceValidation(price)) {
        console.log("Invalid price field");
        return;
      }
      updateReq["price"] = Number(price);
    }

    updateReq["updatedAt"] = new Date().toISOString();

    expenses[index] = {
      ...expenses[index],
      ...updateReq,
    };

    await writeFile("expenses.json", expenses);
    console.log("Updated successfully", expenses[index]);
  });

program
  .command("search")
  .argument("<date>", "expense createdAt field")
  .description("search expense by date")
  .action(async (date) => {
    const expenses = await readFile(file, true);
    const results = expenses.filter((expense) =>
      expense.createdAt.startsWith(date)
    );
    if (results.length === 0) {
      console.log("No expenses were found by the provided date");
      return;
    }
    console.log(results);
  });

program
  .command("get")
  .argument("<id>", "expense id field")
  .description("get expense by id")
  .action(async (id) => {
    const expenses = await readFile(file, true);
    const index = expenses.findIndex((e) => e.id === Number(id));
    if (index === -1) {
      console.log("There is no expense with that id");
      return;
    }
    console.log(expenses[index]);
  });

program.parse();
