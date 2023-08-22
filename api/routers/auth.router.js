import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/sign/up", signUp);