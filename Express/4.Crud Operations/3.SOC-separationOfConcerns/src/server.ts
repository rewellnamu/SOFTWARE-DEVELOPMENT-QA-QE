import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { events } from "./db/events"
import { userData } from "./db/userData"
import pool from "./db/db.config"
import usersRoutes from "./routes/usersRoute"
import eventsRoutes from './routes/eventsRoute'
import { notFound } from "./middlewares/errorMiddlewares"

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


//create the routes 
app.use("/api/v1/users", usersRoutes )
app.use("/api/v1/events", eventsRoutes )


//middlewares after the routes 
app.use(notFound)

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 

