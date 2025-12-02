import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { type UserDocument } from "../db/models/User.js";
import type { RegisterPayload, LoginPayload } from "../schemas/auth.schema.js";
import HttpError from "../utils/HttpError.js";

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("GWT_SECRET not define in enviroment variables");
}

type userFindResult = UserDocument | null;

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
  };
}

export const registerUser = async (
  payload: RegisterPayload,
): Promise<UserDocument> => {
  const user: userFindResult = await User.findOne({ email: payload.email });
  if (user) throw HttpError(409, "Email already exist");
  const hashPasswoord: string = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPasswoord });
};
export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResult> => {
  const user: userFindResult = await User.findOne({
    $or: [{ username: payload.username }, { email: payload.email }],
  });
  if (!user) throw HttpError(401, "User not found");
  const passwordCompare: boolean = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!passwordCompare) throw HttpError(401, "Password invalid");
  const tokenPayload = {
    id: user._id,
  };
  const accessToken: string = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15min",
  });
  const refreshToken: string = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  return {
    accessToken,
    refreshToken,
    user: {
      email: user.email,
    },
  };
};
