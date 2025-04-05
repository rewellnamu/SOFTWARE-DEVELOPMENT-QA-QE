import express from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { isUtf8 } from "buffer"

//configure the dotenv 
dotenv.config()

//instance of express
const app = express()

//load the variables
const port = process.env.PORT 
console.log(port) //3000


//eneable CORS for all origins  
//app.use(cors())

//enable cors with options (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))

//get the current  directory 
const _dirname = path.resolve()

//synchronously read the file from our db folder
//this is a json file that contains the events data
const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
)

//console.log(eventData)

//a simple get request saying hello world  
app.get('/', (req, res) => {

    res.send(`Hello World, Be humble to us`)
})
//a simple get request from our db folder
//this will return the events data in json format
app.get('/events', (req, res) => {

    res.send(eventData)
})

// create server that listens on port 1995
//this will return the events data in json format
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concerns 