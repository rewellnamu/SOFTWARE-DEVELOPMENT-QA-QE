import { Request, Response, NextFunction } from "express";

//Middleware to catch all routes that dont exist 
export const notFound = (req: Request, res:Response, next:NextFunction) => {
    const error = new Error(`Resource Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // If statusCode wasn't set earlier, use 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message,
      // Only display stacktrace in non-production
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
