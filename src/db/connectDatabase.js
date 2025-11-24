import "dotenv/config";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;


const connectDatabase = () => {
  return mongoose.connect(MONGODB_URI);
};

export default connectDatabase;

