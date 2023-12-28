import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export const CustomError = (code: number, message: string) => {
  const error = new Error() as any;
  error.message = message;
  error.statusCode = code;
  return error;
};

export const HashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const ComparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateJwtToken = (payload: string | object | Buffer) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
