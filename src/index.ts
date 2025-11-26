import "dotenv/config";
import startServer from "./server.js";
import connectDatabase from "./db/connectDatabase.js";


  await connectDatabase();
  startServer();

