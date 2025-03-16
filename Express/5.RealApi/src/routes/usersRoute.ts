import express from "express";
import { 
    createUser, 
    deleteUser, 
    getUserById, 
    getUsers, 
    updateUser 
} from "../controllers/userController";
import { protect } from "../middlewares/auth/protect";
import { adminGuard } from "../middlewares/auth/roleMiddleware";


const router = express.Router();

// 📌 1️⃣ Secure User Routes with RBAC
// Modify userRoutes.ts to: ✅ Require authentication (protect) before accessing routes.
// ✅ Use role-based guards (adminGuard) to limit access.
// ✅ Admins can manage users (CRUD).
// ✅ Regular users (Organizers & Attendees) cannot modify users.
// ✅ Public registration remains open (POST /users).

// Public route - Any user can register
router.post("/", createUser);

// Protected routes - Only Admins can manage users
router.get("/", protect, adminGuard, getUsers);
router.get("/:id", protect, adminGuard, getUserById);
router.put("/:id", protect, adminGuard, updateUser);
router.delete("/:id", protect, adminGuard, deleteUser);

export default router;
