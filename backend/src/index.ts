import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "../src/config/db";
import authRoutes from "../src/routes/authRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import cors from "cors";
dotenv.config();

connectDB();

const app: Express = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
