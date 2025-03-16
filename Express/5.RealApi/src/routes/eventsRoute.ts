import express from "express";
import { 
    createEvent, 
    getEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent 
} from "../controllers/eventsController";
import { protect } from "../middlewares/auth/protect";
import { adminGuard, organizerGuard } from "../middlewares/auth/roleMiddleware";
import { eventOwnerGuard } from "../middlewares/events/eventOwnGuard";


const router = express.Router();

// Public Routes - Attendees can view events
router.get("/", getEvents);
router.get("/:id", getEventById);

// Protected Routes - Only Organizers can manage their own events
router.post("/", protect, organizerGuard, createEvent);
router.put("/:id", protect, organizerGuard, eventOwnerGuard, updateEvent);
router.delete("/:id", protect, organizerGuard, eventOwnerGuard, deleteEvent);

// Admin Routes - Admins can manage all events
router.delete("/:id/admin", protect, adminGuard, deleteEvent);

export default router;
