import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { events } from "./db/events"
import { userData } from "./db/userData"

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

//console.log(eventData)


//a simple get request saying hello world  
app.get('/', (req, res) => {
    res.send(`Hello World, Be humble to us`)
})


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


//get all users or one user
app.get("/api/v1/users/:id?", (req: Request, res: Response) => {
    const userId = req.params.id;
    if (userId) {
        try {
            // Ensure req.params.id is a valid number
            // const {eventId}  = req.params
            // const parsedNumber = Number(eventId)
            const userId = Number(req.params.id);
            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid user ID" });
                return; // Explicit return to stop further execution
            }

            // Find the user in the dataset
            const user = userData.find((userObj) => userObj.userID === userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return; // Explicit return to stop further execution
            }

            // Return the event if found
            res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        //"Fetching all events"
        res.send(userData)
    }
});

//Lets create a new event 
//POST 
//when sending data post,put,patch - need to be sent as json format 
//this means we will need to add middlewars to help with that 
//midle wares
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.post('/api/v1/users', (req: Request, res: Response) => {

    //lets destructure the incoming body request 
    //const body = req.body 
    //const userName = req.body.user
    // const  {title, fname, lname, password} = req.body
    const { body } = req

    //if the userdata is empty, the id will be 1 else we will add 1 to the last id in the lenght
    const newId = userData.length > 0 ? userData[userData.length - 1].userID + 1 : 1

    //push the object data to userObject 
    const newData = { id: newId, ...body }
    userData.push(newData)

    //send it to the server 
    res.status(201).json({
        message: "Successfully posted",
        payload: newData
    })

})



// 📌 Step 1: Implement PUT (Full Update)
// 🟠 Update a User (PUT /api/v1/users/:id)
// Completely replaces the existing user with new data.

app.put('/api/v1/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id)
    const { userName, displayName } = req.body

    //validate the input 
    if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user id" })
        return
    }

    //get the userIndex
    const userIndex = userData.findIndex((user) => user.userID === userId)
    //if the user index is unavailable
    if (userIndex === -1) {
        res.status(404).json({ message: "User not found" })
        return
    }

    //replace the user at that index with new data 
    //make sure while using put, put all releveant data even the id
    userData[userIndex] = { userID: userId, userName, displayName }

    res.json({ message: "User successfully updated", user: userData[userIndex] })

})



// Step 2: Implement PATCH (Partial Update)
// 🟡 Partially Update a User (PATCH /api/v1/users/:id)
// Updates only specific fields

app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id)
    const { userName, displayName } = req.body

    //validate the input 
    if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user id" })
        return
    }

     // Find the user in the dataset
     const user = userData.find((userObj) => userObj.userID === userId);

     if (!user) {
         res.status(404).json({ message: "User not found" });
         return; // Explicit return to stop further execution
     }


     //upddated only provided fields 
     if(userName) user.userName = userName
     if(displayName) user.displayName = displayName

     res.json({ message: "User  partially updated", user })

})



// 📌 Step 3: Implement DELETE (Remove a User)
// 🔴 Delete a User (DELETE /api/v1/users/:id)
// Removes the user from the list

app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id)

    //validate the input 
    if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user id" })
        return
    }

    //get the userIndex
    const userIndex = userData.findIndex((user) => user.userID === userId)
    //if the user index is unavailable
    if (userIndex === -1) {
        res.status(404).json({ message: "User not found" })
        return
    }

    //delete that user on that index found
    userData.splice(userIndex, 1)

    res.json({ message: `User with userId: ${userId} successfully deleted`})

})




// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 

