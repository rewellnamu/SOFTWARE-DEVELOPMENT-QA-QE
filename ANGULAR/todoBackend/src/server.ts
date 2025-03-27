import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL Connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// API to Add User with Todos
app.post('/api/users', async (req, res) => {
  const { name, email, todos } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, todos) VALUES ($1, $2, $3) RETURNING *',
      [name, email, JSON.stringify(todos)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
