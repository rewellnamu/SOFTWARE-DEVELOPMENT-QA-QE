import express from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"

//configure the dotenv 
dotenv.config()

//instance of express
const app = express()

//load the variables
const port = process.env.PORT 
console.log(port) //3000


//eneable CORS for all origins  
//app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))

//get the current  directory 
const _dirname = path.resolve()

//synchronously read the file
const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
)

//console.log(eventData)

//a simple get request saying hello world  
app.get('/', (req, res) => {

    res.send(`Hello World, Be humble to us`)
})

app.get('/api/events', (req, res) => {

    res.send(eventData)
})

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 