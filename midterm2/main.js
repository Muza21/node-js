// გააკეთეთ ხარჯების ქრადი ejs ის გამოყენებით:

// 1) ბექენდში გამოყეთ /api და ვიუს როუტები. => 1 ქულა
// 2) ხარჯები შეინახეთ expenses.json ში და გამოიყენეთ fs/promises მოდული ქრადის ფუნცქიონალისთვის, Create, Read, Read by id, Update, Delete => 2 ქულა
// 3) გამოიყენეთ მინუმუმ 2 partial კომპონენტი => 1 ქულა
// 4) ჰოუმ ფეიჯზე დაამატეთ კატეგორიის ფილტრის ფუნქციონალი, გექნებათ 1 ინფუთი და შიგნით სერჩის შემდეგ ბათონი search რომელიც მოძებნის ამ კატეგორიას და გამოაჩენს შედეგს. => 1 ქულა

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/api.routes"));
app.use("/", require("./routes/view.routes"));

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
