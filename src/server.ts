import express from "express";
import type { Application } from "express";
import cors from "cors";
import "dotenv/config";
// import mainRouter from "./routes/mainRouter.js";

import notFoundHandler from "./middlewares/notFoundHandler.js"; 

const startServer = ():void => {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());

  // app.use("/", mainRouter);

  app.use(notFoundHandler);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default startServer;



