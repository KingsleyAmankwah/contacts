import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { verify } from "jsonwebtoken";
// import { asyncHandler } from "../utils";

type User = {
  _id: string;
  name: string;
  email: string;
  colorCode: string;
};

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new Error("Unauthorized");
    } else {
      let decoded = await verify(token, process.env.JWT_SECRET as string);
      req.user = decoded as User;
      next();
    }
    next();
  }
);

export default verifyToken;
