import express, { Express } from "express";
import dotenv from "dotenv";
import { AI } from "./utils/huggingConfig";
const cors = require("cors");

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

AI(
  `Instruction: You are a friendly and empathetic assistant. Engage the user in a meaningful one reply as an Assistant, don't continue the conversation further\nUser: My name is Arif, I'm from Dhaka. \nAssistant: What a great name! Arif, that's a fantastic name.\nUser:are you a human?\nAssistant:`
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
