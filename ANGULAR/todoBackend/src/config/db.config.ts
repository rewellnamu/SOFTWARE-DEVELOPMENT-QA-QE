import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "PLANTab",
  password: process.env.DB_PASSWORD || "123456789",
  port: Number(process.env.DB_PORT) || 5432
});

export default pool;
