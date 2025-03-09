import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { events } from "./db/events"

//configure the dotenv 
//top most level
dotenv.config()

//instance of express
//the second most top level
const app = express()

//load the variables
const port = process.env.PORT
const secret = process.env.SECRET
console.log(port) //3000
console.log(secret) //a_very_strong_secret_for_you


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


//get all elements 
// app.get('/api/events', (req, res) => {
//     res.send(events)
// })


//Now, let's create a GET API route that filters events based on query parameters
app.get('/api/eventsFilter', (req: Request, res: Response) => {
    try {
        const { title, location, company, price } = req.query

        //on the first filters, the whole evets havent been filtered
        let filteredEvents = [...events]

        //filtering logic
        if (title) {
            filteredEvents = filteredEvents.filter((event) => event.title.toLowerCase().includes((title as string).toLowerCase()))
        }
        if (location) {
            filteredEvents = filteredEvents.filter((event) => event.location.toLowerCase().includes((location as string).toLowerCase()))
        }
        if (company) {
            filteredEvents = filteredEvents.filter((event) => event.company.toLowerCase().includes((company as string).toLowerCase()))
        }
        if (price) {
            const priceNum = parseFloat(price as string)
            filteredEvents = filteredEvents.filter((event) => event.price === priceNum)
        }


        res.send(filteredEvents)
    } catch (error) {

    }
})



//Lets Fetch a specific Event by ID
// 📍 Steps
// Extract id from req.params.
// Convert it to a number (parseInt).
// Find the event in the dataset.
// Return the event or a 404 error if not found.
// app.get('/api/events/:id', (req: Request, res: Response) => {
//     try {
//         // Ensure req.params.id is a valid number
//         // const {eventId}  = req.params
//         // const parsedNumber = Number(eventId)
//         const eventId = Number(req.params.id);
//         if (isNaN(eventId)) {
//             res.status(400).json({ message: "Invalid event ID" });
//             return; // Explicit return to stop further execution
//         }

//         // Find the event in the dataset
//         const event = events.find((eventObj) => eventObj.id === eventId);

//         if (!event) {
//             res.status(404).json({ message: "Event not found" });
//             return; // Explicit return to stop further execution
//         }

//         // Return the event if found
//         res.json(event);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


//Hnadling multiple route paramters 
//We can combine multiple route parameters in one request.
//GET http://localhost:3000/api/events/music/1
app.get('/api/events/:category/:id', (req: Request, res: Response) => {
    const { category, id } = req.params
    res.send(`Category: ${category}, Event Id: ${id}`)
})
//Category: music, Event Id: 1

//Optional Route paramas 
//Route parameters can be optional by adding a ? after the parameter name.
app.get("/api/events/:id?", (req: Request, res: Response) => {
    const eventId = req.params.id;
    if (eventId) {
        try {
            // Ensure req.params.id is a valid number
            // const {eventId}  = req.params
            // const parsedNumber = Number(eventId)
            const eventId = Number(req.params.id);
            if (isNaN(eventId)) {
                res.status(400).json({ message: "Invalid event ID" });
                return; // Explicit return to stop further execution
            }

            // Find the event in the dataset
            const event = events.find((eventObj) => eventObj.id === eventId);

            if (!event) {
                res.status(404).json({ message: "Event not found" });
                return; // Explicit return to stop further execution
            }

            // Return the event if found
            res.json(event);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        //"Fetching all events"
        res.send(events)
    }
});



// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 