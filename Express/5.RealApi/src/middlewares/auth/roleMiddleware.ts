//2️⃣ Role-Based Authorization Guards
//We can now define RBAC guards to restrict actions based on user roles.
import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import { RoleRequest } from "../../../utils/types/userRoleTypes";

// Ensure user has required role
const roleGuard = (allowedRoles: string[]) =>
    asyncHandler<void, RoleRequest>(async (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role_name)) {
            res.status(403).json({ message: "Access denied: Insufficient permissions" });
            return;
        }
        next();
    });



// Specific guards
const adminGuard = roleGuard(["Admin"]);         // Full app control
const organizerGuard = roleGuard(["Organizer"]); // Event creation & management
const attendeeGuard = roleGuard(["Attendee"]);   // Attendee-only actions

export { adminGuard, organizerGuard, attendeeGuard, roleGuard };
