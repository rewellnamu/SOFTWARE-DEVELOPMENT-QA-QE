// Your generateToken function is mostly well-structured, but here’s how we can improve it to follow best security standards and ensure it’s more robust and future-proof.

// 🔍 Issues & Improvements
// ✅ What's Good
// ✅ Uses dotenv.config() to load environment variables.
// ✅ Ensures JWT_SECRET is defined before use.
// ✅ Sets HTTP-Only cookies for better security.
// ✅ Uses secure: true in production, preventing token leaks.
// ✅ Implements a standard expiration time (30 days).

// ❌ Areas for Improvement
// ❌ Missing Refresh Token Support → Prevents automatic session expiration without re-login.
// ❌ Doesn't Include User Role → Would help with role-based authorization checks.
// ❌ No Error Handling for Cookie Setting → Should catch cookie-related issues.
// ❌ No Option to Sign Shorter-Lived Access Tokens → 30 days is too long for an access token.
// ❌ Missing Token Expiry Metadata → No way to verify expiry easily.

// 🚀 Improved generateToken.ts (Best Practices)
// This improved version: ✅ Includes role_id in JWT payload
// ✅ Generates an access token (short-lived) and a refresh token (longer-lived)
// ✅ Provides better security settings for production
// ✅ Handles potential errors properly

import { Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


// Debugging - Check if env variables are loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

const generateToken = (res: Response, userId: string, roleId: number) => {
    const jwtSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    
    if (!jwtSecret || !refreshSecret) {
        throw new Error("JWT_SECRET or REFRESH_TOKEN_SECRET is not defined in environment variables");
    }

    try {
        // Generate Short-Lived Access Token (15 minutes)
        const accessToken = jwt.sign(
            { userId, roleId }, 
            jwtSecret, // Use the validated variable
            { expiresIn: "15m" }
        );

        // Generate Long-Lived Refresh Token (30 days)
        const refreshToken = jwt.sign(
            { userId }, 
            refreshSecret, // Use the validated variable
            { expiresIn: "30d" }
        );

        // Set Access Token as HTTP-Only Secure Cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // Secure in production
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        // Set Refresh Token as HTTP-Only Secure Cookie
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating JWT:", error);
        throw new Error("Error generating authentication tokens");
    }
};

export default generateToken;


// 1️⃣ Access Token & Refresh Token System
// Access Token (15m) → Used for authentication in requests.
// Refresh Token (30d) → Used to renew the access token without forcing the user to re-login.
// 2️⃣ Role-Based Token Payload
// Includes roleId in the JWT so permissions can be checked instantly.
// 3️⃣ Strong Security for Cookies
// httpOnly: true → Prevents JavaScript access (mitigates XSS attacks).
// secure: true → Ensures HTTPS-only transmission in production.
// sameSite: strict → Prevents CSRF attacks.
// 4️⃣ Better Error Handling
// If there's an issue generating the tokens, it throws an error instead of silently failing.
