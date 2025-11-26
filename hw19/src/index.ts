// თქვენი დავალება შემდეგია
// 1) შექმენით პროდუქტების ქრადი ექსპრესის ტაიპსკრიპტსის და მონგუსის გამოყენებით.
// 2) პროდუქტს უნდა ჰქონდეს, სახელი, აღწერა, ფასი, ფოტო (ფოტოზე შეგიძლიათ ლინკი გამოიყენოთ რაიმე პროდუქტის), კატეგორია.
// 3) გამოიყენეთ Joi ვალიდაციებისთვის
// 4) გააკეთეთ მიდლვიარი რომელიც წაშლის დროს შეამოწმებს ჰედერებში თუ მოუყვება როლი ადმინი მხოლოდ მაშინ წაშალოს პროდუქტი, იგივე ქენით განახლებაზეც.
// 5) გააკეთეთ ზუსტად ისეთი ფოლდერების სტრუქტურა როგორც დღეს ვქენი ლექციაზე. სორსში უნდა გქონდეთ validations, config, models, routes, servises, middlewares და index.ts

// როგორ უნდა დასტარტოთ express TS-ზე: https://github.com/Datodia/ts-express

import express from "express";
import expenseRouter from "./expense/expense.routes";
import { PORT } from "./config/app.config";
import { connectToDB } from "./config/db.config";

const app = express();
app.use(express.json());
app.use("/expenses", expenseRouter);

async function startServer() {
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
