import express from "express";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/eventsController";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;