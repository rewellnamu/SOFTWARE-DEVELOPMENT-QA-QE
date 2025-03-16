import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import pool from "../../config/db.config";
import { UserRequest } from "../../../utils/types/userTypes";

// Auth Middleware to Protect Routes
//Since eventOwnerGuard.ts depends on req.user, we must ensure protect.ts always assigns req.user
export const protect = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    let token;

    // ✅ Try to get token from Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    
    // ✅ Try to get token from Cookies (for frontend apps)
    if (!token && req.cookies?.access_token) {
        token = req.cookies.access_token;
    }

    // ❌ No token found
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; roleId: number };

        // Get User from Database
        const userQuery = await pool.query(
            "SELECT users.id, users.name, users.email, users.role_id, user_roles.role_name FROM users JOIN user_roles ON users.role_id = user_roles.id WHERE users.id = $1",
            [decoded.userId]
        );

        if (userQuery.rows.length === 0) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        req.user = userQuery.rows[0]; // ✅ Attach user to request

        next(); // Proceed
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
});

