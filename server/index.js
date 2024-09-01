import express from "express";
import cookieParser from "cookie-parser";
import { config as configDotenv } from "dotenv";
import apiRouter from "./src/routes/index.js";
import connectdb from "./src/config/db.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
connectdb();
configDotenv();

const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from the server" });
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
