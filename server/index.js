import express from "express";
import apiRouter from "./src/routes/index.js";
import { config as configDotenv } from "dotenv";
import connectdb from "./src/config/db.js";
import cookieParser from "cookie-parser";

const app = express();
configDotenv();
app.use(express.json());
app.use(cookieParser());
connectdb();


const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from the server" });
});

app.use("/api", apiRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
