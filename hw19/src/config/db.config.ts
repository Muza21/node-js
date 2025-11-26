import mongoose from "mongoose";
import { MONGO_URL } from "./app.config";

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Could not connect to the DB:", error);
    process.exit(1);
  }
};
