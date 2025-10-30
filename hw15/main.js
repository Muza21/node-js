// დაამატე შემდეგი ფუნქციონალი წინა ხარჯების დავალებას (დავალება 14):

// 1) შექმენი routes და გააერთიანე ყველა ხარჯი ამ routes-ში. შეგიძლიათ გამოიყენოთ როგორც layer based ასევე featured based არქიტექტურა.

// 2) დაამატე services ფაილი, სადაც დაწერ ყველა ლოგიკას.

// 3) შექმენი middleware და დაამატე ის delete route-ზე — თუ headers-ში აუცილებელი key არ არის მიწოდებული, დააბრუნე ერორი.

// 4) შექმენი middleware, რომელიც დაემატება create expense route-ს და შეამოწმებს, ყველა აუცილებელი ველი გადმოცემულია თუ არა; წინააღმდეგ შემთხვევაში, დააბრუნოს ერორი.

// 5) შექმენი /random-fact route, რომელიც აბრუნებს ნებისმიერ შემთხვევით ფაქტს. დაამატე middleware, რომელიც ამ route-ზე შემთხვევითად ნახევარ მოთხოვნას დაბლოკავს, ხოლო დანარჩენს გაუშვებს. დაბლოკავს იგულისმება რო ერორს დაუბრუნებს რენდომად

const express = require("express");
const expenseRouter = require("./router/expense.router");
const randomFactRouter = require("./router/randomFact.router");
const app = express();

app.use(express.json());

app.use("/expenses", expenseRouter);
app.use("/random-fact", randomFactRouter);

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
