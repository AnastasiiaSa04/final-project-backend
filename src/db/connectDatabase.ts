import "dotenv/config";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not define in enviroment variables");
}

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error");
    }
  }
};

export default connectDatabase;
