import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { events } from "./db/events"
import { userData } from "./db/userData"
import pool from "./db/db.config"

//1:configure the dotenv 
//top most level
dotenv.config()

//2:instance of express
//the second most top level
const app = express()

//3:load the variables
const port = process.env.PORT
const secret = process.env.SECRET



//4: enable middlewares 
//this will enable stringying to json
app.use(express.json())
//eneable CORS for all origins  
// app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))


//midle wares
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//get the current  directory 
const _dirname = path.resolve()

//synchronously read the file
const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
)

//create a user (post /api/v1/users)
//reading an external thing ike a file, a database, etc, cloud 
//these things need time to connect to them - so making the request Asynchronous will help with the logic
app.post('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        //check if email exists
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({
                message: "User already exists"
            })
            return
        }
        //insert the user 
        const userResult = await pool.query(
            "INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, password]
        )
        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//Get All users 
app.get('/api/v1/users', async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.users ORDER BY id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//Get single user
app.get('/api/v1/users/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const result = await pool.query("SELECT * FROM public.users WHERE id = $1", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
       }
        res.status(200).json(result.rows[0]) 
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//update user 
app.put('/api/v1/users/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const { name, email, password } = req.body

        const checkUser = await pool.query("SELECT * FROM public.users WHERE id = $1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
       } 
        const result = await pool.query(
            "UPDATE users SET name=$1, email=$2, password=$3, updated_at=NOW() WHERE id=$4 RETURNING *",
            [name, email, password, id]
        );
        res.json({ message: "User updated", user: result.rows[0] });
    
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//delete user  
app.delete('/api/v1/users/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params

        const checkUser = await pool.query("SELECT * FROM public.users WHERE id = $1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
       } 
        await pool.query("DELETE FROM public.users WHERE id = $1",[id]);
        res.json({ message: "User deleted successful" });
    
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



//create an event
// ✅ Correct Dynamic event creation endpoint:
app.post("/api/v1/events", async (req: Request, res: Response) => {
    try {
        const { title, location, date, price, user_id } = req.body;

        // First, dynamically verify the user exists:
        const userCheck = await pool.query(
            "SELECT id FROM users WHERE id = $1",
            [user_id]
        );

        if (userCheck.rows.length === 0) {
             res.status(400).json({ message: "User does not exist" });
             return
        }

        // Proceed to create event
        const eventResult = await pool.query(
            `INSERT INTO events (title, location, date, price, user_id) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, location, date, price, user_id]
        );

        res.status(201).json({
            message: "Event created successfully",
            event: eventResult.rows[0]
        });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 

