import asyncHandler from "express-async-handler";
import {
  ComparePassword,
  CustomError,
  HashPassword,
  generateJwtToken,
} from "../utils";
import User from "../models/user";

const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw CustomError(400, "Please fill all the fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw CustomError(400, "User already exist");
  }

  const hashedPassword = await HashPassword(password);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = generateJwtToken({
    _id: user._id,
    name: user.name,
    email: user.email,
  });

  res.status(200).send({
    data: { token },
    success: true,
    message: "Registration successful...",
  });
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw CustomError(400, "Please fill all the fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw CustomError(400, "Invalid credentials.");
  }

  const passwordIsCorrect = await ComparePassword(password, user.password);
  if (!passwordIsCorrect) {
    throw CustomError(400, "Invalid Credentials");
  }

  const token = generateJwtToken({
    _id: user._id,
    name: user.name,
    email: user.email,
  });

  res.status(200).send({
    data: { token },
    success: true,
    message: `Welcome back, ${user.name}!`,
  });
});

const UserController = { signIn, signUp };

export default UserController;
