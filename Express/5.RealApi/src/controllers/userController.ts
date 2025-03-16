import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";

// Create a new user (Public Route)

// 📌 2️⃣ Secure User Controller with Type Safety
// Modify userController.ts to:

// Use UserRequest instead of Request.
// Ensure Admins manage users (using adminGuard in userRoutes.ts).
// Return only safe user details (excluding password).
// ✅ Ensures Admins can manage users (CRUD).
// ✅ Returns safe user details (excludes password).
// ✅ New users default to the Attendee role.
export const createUser = asyncHandler(async (req: UserRequest, res: Response) => {
    const { name, email, password } = req.body;

    // Check if email exists
    const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (emailCheck.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    // Insert new user with default role (Attendee)
    const userResult = await pool.query(
        "INSERT INTO users (name, email, password, role_id) VALUES($1, $2, $3, $4) RETURNING id, name, email, role_id",
        [name, email, password, 1] // Default role: Attendee
    );

    res.status(201).json({
        message: "User successfully created",
        user: userResult.rows[0]
    });
});

// Get all users (Admin only)
export const getUsers = asyncHandler(async (req: UserRequest, res: Response) => {
    const result = await pool.query("SELECT id, name, email, role_id FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
});

// Get single user (Admin only)
export const getUserById = asyncHandler(async (req: UserRequest, res: Response) => {
    const { id } = req.params;
    const result = await pool.query("SELECT id, name, email, role_id FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    res.status(200).json(result.rows[0]);
});

// Update user (Admin only)
export const updateUser = asyncHandler(async (req: UserRequest, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const checkUser = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (checkUser.rows.length === 0) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const result = await pool.query(
        "UPDATE users SET name=$1, email=$2, password=$3, updated_at=NOW() WHERE id=$4 RETURNING id, name, email, role_id",
        [name, email, password, id]
    );

    res.json({ message: "User updated", user: result.rows[0] });
});

// Delete user (Admin only)
export const deleteUser = asyncHandler(async (req: UserRequest, res: Response) => {
    const { id } = req.params;

    const checkUser = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (checkUser.rows.length === 0) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
});
