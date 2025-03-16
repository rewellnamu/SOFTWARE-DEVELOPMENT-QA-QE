
// Express route handlers can be asynchronous when interacting with a database, making API calls, or doing other asynchronous tasks.
// If an error occurs in an async route handler and isn’t properly caught, it can crash the server because try-catch blocks aren’t automatically applied to promises.
// asyncHandler wraps an asynchronous function (fn) and ensures that any error occurring in the function is passed to next(). This allows Express to handle it via the global error-handling middleware.
import { Request, Response, NextFunction } from "express";

// Define the type for the asynchronous handler function
// type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Wraps an asynchronous function
/**
 * Wraps an asynchronous route handler function to catch errors and pass them to the next middleware.
 *
 * @param fn - The asynchronous function to wrap.
 * @returns A function that executes the async function and catches any errors.
 * The <T = any> generic allows the function to return any type, not just void, which can be useful if your route handlers return a result that might be used later.
 */
const asyncHandler = <T = any>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
