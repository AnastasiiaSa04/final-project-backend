import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerController);
// authRouter.post("/login", loginController);

export default authRouter;
