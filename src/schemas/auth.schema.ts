import * as z from "zod";
import {
  passwordRegex,
  emailRegex,
  passwordMessage,
  usernameRegex,
} from "../constants/auth.constants.js";

export const registerSchema = z.object({
  email: z.string().trim().min(1, "Email must contain @, and not contain spaces").regex(emailRegex),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at least 8 symbols")
    .regex(passwordRegex, passwordMessage),
  fullname: z.string().min(2, "Full name is required"),
  username: z.string().min(5, "Username is required").regex(usernameRegex)
});

export type RegisterPayload = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").regex(emailRegex),
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username must be at least 3 characters")
    .regex(usernameRegex),

  password: z
    .string()
    .min(8, "Password must have at least 8 symbols")
    .regex(passwordRegex, passwordMessage),
});

export type LoginPayload = z.infer<typeof loginSchema>;
