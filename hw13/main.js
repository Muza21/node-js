#!/usr/bin/env node

// 1) დაწერეთ todo-cli ხელსაწყო ქომანდერის გამოყენებით რომელსაც ექნება შემდეგი ფუნცქიონალი:
// todo-cli show => დააბრუნებს ყველა თუდუს ობიექტს
// todo-cli add todoName => დაგიბრუნებთ ახალ შექმნილ თუდუს
// todo-cli delete todoId => დაგიბრუნებთ წაშლილ თუდუს
// todo-cli todoId --name todoName => დაგიბრუნებთ განახლებულ თუდუს.
// თუდუს ობიექტს უნდა გამოიყურებოდეს: {id: 1, title: "ReadBook", isDone: false}
// შეგიძლიათ დაამატოთ სხვადასხვა ფროფერთიები, გაითვალისიწნეთ განახლება უნდა მოხდეს option მეთოდით.

import { Command } from "commander";
import { readFile, writeFile } from "./utils.js";

const program = new Command();

program.name("Todo Cli").description("Todo tasks CLI").version("1.0.0");

program.command("show").action(async () => {
  const todos = await readFile("todos.json", true);
  console.log(todos);
});

program
  .command("add")
  .description("This action adds new todo")
  .argument("<title>", "todo title field")
  .action(async (title) => {
    const todos = await readFile("todos.json", true);
    const lastId = todos[todos.length - 1]?.id || 0;

    const newTodo = {
      id: lastId + 1,
      title,
      isDone: false,
    };

    todos.push(newTodo);
    await writeFile("todos.json", todos);
    console.log(newTodo);
  });

program
  .command("delete")
  .description("This action removes todo")
  .argument("<id>", "todo id field")
  .action(async (id) => {
    const todos = await readFile("todos.json", true);
    const index = todos.findIndex((todo) => todo.id === +id);
    if (index === -1) return console.log("todo does not exists");

    const deleted = todos.splice(index, 1)[0];
    await writeFile("todos.json", todos);
    console.log(deleted);
  });

program
  .command("update <id>")
  .option("-n, --name <title>", "update title")
  .action(async (id, options) => {
    const todos = await readFile("todos.json", true);
    const index = todos.findIndex((todo) => todo.id === +id);
    if (index === -1) return console.log("todo does not exists");

    if (options.name) todos[index].title = options.name;

    await writeFile("todos.json", todos);
    console.log(todos[index]);
  });

program.parse();
