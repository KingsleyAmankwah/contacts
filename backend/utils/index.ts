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

const colors = [
  "#EF4770",
  "#6F6F6F",
  "#DCB604",
  "#199393",
  "#029ACD",
  "#11C1DA",
  "#3B8FFC",
  "#18C6A0",
  "#B387FF",
  "#F75334",
  "#805AD4",
  "#E38072",
  "#3D3029",
  "#F3D39B",
  "#51CE71",
  "#273A33",
  "#743966",
  "#DAA3F5",
  "#B7EF8F",
  "#3C804F",
  "#D17B56",
  "#673FA2",
  "#D4595B",
  "#48ABC7",
];

export const getRandomColorCode = () => {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
};
