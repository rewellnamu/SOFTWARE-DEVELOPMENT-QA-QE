import express, { Router } from "express";
import { getAllBooks,fetchBookById,addBook,updateBook,deleteBook, filteredBooks } from "../controllers/control";

const router = Router();
router.get("/books", getAllBooks);
router.get("/filteredBooks", filteredBooks);
router.get("/books/:id", fetchBookById);
router.post("/books", addBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);
export default router;

