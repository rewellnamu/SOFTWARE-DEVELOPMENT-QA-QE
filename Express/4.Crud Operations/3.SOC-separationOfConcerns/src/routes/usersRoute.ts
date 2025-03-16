import express from "express"
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createUser)
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router