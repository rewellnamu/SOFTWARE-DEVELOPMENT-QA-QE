//This will handle the logic of events 
import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../db/db.config";

export const createEvent = asyncHandler( async (req: Request, res: Response) => {
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


//get all evensts 
export const getEvents = asyncHandler( async (req: Request, res: Response) => {

    try {
        const result = await pool.query("SELECT * FROM events")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//single event  
export const getEventById = asyncHandler( async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await pool.query("SELECT * FROM events WHERE id=$1", [id])
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "Even not found"
            })
            return
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



//update single events 
export const updateEvent = asyncHandler( async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, location, date, price, user_id } = req.body;
    try {
        //before updating, check if the event is available 
        const resultCCheck = await pool.query("SELECT * FROM events WHERE id=$1", [id])
        if (resultCCheck.rows.length === 0) {
            res.status(404).json({
                message: "Even not found"
            })
            return
        }

        const result = await pool.query(
            "UPDATE events SET title=$1, location=$2, date=$3, price=$4, updated_at=NOW() WHERE id=$5 RETURNING *",
            [title, location, date, price, id]
        );
        res.json({ message: "Event updated", event: result.rows[0] });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//Delete event 
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        //before deleting, check if the event is available 
        const resultCCheck = await pool.query("SELECT * FROM events WHERE id=$1", [id])
        if (resultCCheck.rows.length === 0) {
            res.status(404).json({
                message: "Even not found"
            })
            return
        }
        await pool.query("DELETE FROM events  WHERE id=$1", [id])
        res.json({ message: "Event deleted successfully" });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})