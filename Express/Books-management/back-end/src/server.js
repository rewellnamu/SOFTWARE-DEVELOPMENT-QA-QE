"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
console.log(port);
const _dirname = path_1.default.resolve();
const eventData = (0, fs_1.readFileSync)(path_1.default.join(_dirname, "src", "db", "db.json"), "utf-8");
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/events", (req, res) => {
    res.send(eventData);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
