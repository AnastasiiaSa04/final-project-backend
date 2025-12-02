import { Schema, model, Document } from "mongoose";
import { emailRegex, usernameRegex } from "../../constants/auth.constants.js";
import { handleSaveError, setUpdateSettings } from "../hooks.js";

export interface UserDocument extends Document {
  username: string;
  fullname: string;
  email: string;
  password: string;
  verify: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  createAt: Date;
  updateAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      match: usernameRegex,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
      default: null,
    },
    refreshToken: {
      type: String,
      required: true,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model<UserDocument>("user", userSchema);

export default User;
