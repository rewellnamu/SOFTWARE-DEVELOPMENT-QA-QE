import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private Route (User must be logged in to log out)
router.post("/logout", logoutUser);

export default router;
