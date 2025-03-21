//dotenv
//express instance
//load variables
//enable all important middleware
//create all routes 
//load more middleware - eg error handlers
//start the server 
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"
import pool from './config/db.config'

// 1:dotenv
dotenv.config()

//2:instance of express  
const app = express()

//3:NEVER IN YOUR LIFE FORGET THIS 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//Cookie parser middleware
app.use(cookieParser())
//eneable CORS for all origins  
// app.use(cors())



const allowedOrigins = [
    "http://localhost:4200",];

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allows cookies and auth headers
    optionsSuccessStatus: 200 // Handle preflight requests
}));

app.get("/", (req, res) => {
    res.send("To-Do List API is running...");
  });

  app.post("/todos", async (req, res) => {
    const { user_id, task, duration } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO todos (user_id, task, duration) VALUES ($1, $2, $3) RETURNING *",
        [user_id, task, duration]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  app.get("/todos", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM todos ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  });
  
  app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT users.id, users.name, users.email, 
          json_agg(json_build_object('task', todos.task, 'duration', todos.duration)) AS todos 
        FROM users 
        LEFT JOIN todos ON users.id = todos.user_id 
        GROUP BY users.id;
      `);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);
  
      if (result.rowCount === 0) {
         res.status(404).json({ message: "Task not found" });
         return
      }
  
      res.json({ message: "Task deleted successfully", deletedTask: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
  });
  app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { task, duration } = req.body;
  
    try {
      const result = await pool.query(
        "UPDATE todos SET task = $1, duration = $2 WHERE id = $3 RETURNING *",
        [task, duration, id]
      );
  
      if (result.rowCount === 0) {
         res.status(404).json({ message: "Task not found" });
         return
      }
  
      res.json({ message: "Task updated successfully", updatedTask: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: "Error updating task" });
    }
  });
  
  
//5. middlewares for error handlers 


//6: start the serve 
const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`🚀🚀 server is running on port - ${PORT}`)
})
