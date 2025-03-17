import express from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";
import chalk from "chalk";

dotenv.config();

const app = express();

const port = process.env.PORT;
console.log(port);

app.use(
  cors({
    origin: " http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

const _dirname = path.resolve();

const eventData = readFileSync(
  path.join(_dirname, "src", "db", "db.json"),
  "utf-8"
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/events", (req, res) => {
  res.send(eventData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
