// 🚀 Implementing Authentication Controller (authController.ts)
// To differentiate users based on roles during login and registration, we need to:

// Register Users → Default role will be Attendee (1) unless specified.
// Login Users → Authenticate users and return their role in the response.
// Generate JWT Token → Secure authentication and role-based access.import { Response } from "express";
import { Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler";
import { UserRequest } from "../../utils/types/userTypes";
import pool from "../config/db.config";
import generateToken from "../../utils/helpers/genereateToken";

/**
 * @desc Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    const { name, email, password, role_id = 1 } = req.body;

    // Check if user exists
    const userExists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into DB
    const newUser = await pool.query(
        "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role_id",
        [name, email, hashedPassword, role_id]
    );

    // Generate JWT Token
    generateToken(res, newUser.rows[0].id, newUser.rows[0].role_id);

    res.status(201).json({
        message: "User registered successfully",
        user: newUser.rows[0]
    });

    next();
});

/**
 * @desc Authenticate user & get token
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check if user exists
    const userQuery = await pool.query(
        `SELECT users.id, users.name, users.email, users.password, users.role_id, user_roles.role_name
         FROM users
         JOIN user_roles ON users.role_id = user_roles.id
         WHERE email = $1`,
        [email]
    );

    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    const user = userQuery.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    // Generate JWT Token
    generateToken(res, user.id, user.role_id);

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name
        }
    });

    //next();
});

/**
 * @desc Logout user / clear cookie
 * @route POST /api/v1/auth/logout
 * @access Private
 */
export const logoutUser = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.cookie("refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.status(200).json({ message: "User logged out successfully" });

    next();
});
