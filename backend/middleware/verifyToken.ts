import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { verify } from "jsonwebtoken";

type User = {
  _id: string;
  name: string;
  email: string;
  // colorCode: string;
};

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // Extract the token part
    } else {
      throw new Error("Unauthorized: No token provided");
    }

    const decoded = verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as User;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    throw error;
  }
});

export default verifyToken;
