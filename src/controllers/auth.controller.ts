import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../db/models/User.js"; // путь к твоей модели
import validateBody from "../utils/validateBody.js";
import { registerSchema } from "../schemas/auth.schema.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    validateBody(registerSchema, req.body);

    const { email, username, fullname, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      fullname,
      password: hashedPassword,
      accessToken: null,
      refreshToken: null,
      verify: false,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        fullname: newUser.fullname,
      },
    });
  } catch (err: any) {
    console.error(err);

    if (err.name === "ZodError" || err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
