import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { checkUserExists } from "../middlewares/query/query.middleware.js";

export const authRouter = Router();

authRouter.post("/sign/up", signUp);
authRouter.post("/sign/in", checkUserExists, signIn);