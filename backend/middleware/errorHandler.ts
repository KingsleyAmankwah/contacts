import { Request, Response } from "express";

const ErrorHandler = (err: any, req: Request, res: Response) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const stack = process.env.NODE_ENV === "production" ? "🥞" : err.stack;
  res.status(status).json({
    success: false,
    status,
    message,
    stack,
  });
};

export default ErrorHandler;
