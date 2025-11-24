import express from "express";
import cors from "cors";
import connectDatabase from "./db/connectDatabase.js"; 
import "dotenv/config";

const startServer = async () => {
  await connectDatabase();
  console.log("Successfully connected to database ");

  const app = express();
  app.use(cors());
  app.use(express.json());

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default startServer; 


