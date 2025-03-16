import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import usersRoutes from "./routes/usersRoute"
import eventsRoutes from './routes/eventsRoute'
import { errorHandler, notFound } from "./middlewares/errorMiddlewares"
import authRoutes from "./routes/authRoutes"
import cookieParser from "cookie-parser"

//1:configure the dotenv 
//top most level
dotenv.config()

//2:instance of express
//the second most top level
const app = express()

//3:load the variables
const port = process.env.PORT
const secret = process.env.SECRET


//NEVER IN YOUR LIFE FORGET THESE 
//4: enable middlewares 
//this will enable stringying to json
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
//Cookie parser middleware
app.use(cookieParser())




//create the routes 
app.use("/api/v1/auth", authRoutes);  // ✅ NEW - Authentication routes
app.use("/api/v1/users", usersRoutes )
app.use("/api/v1/events", eventsRoutes )


//middlewares after the routes 
app.use(notFound)
// Global Error Handler
app.use(errorHandler);


// create server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
//SOC - separtion of concersn 

