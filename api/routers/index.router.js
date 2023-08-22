import { Router } from "express";
import { authRouter } from "./auth.router.js";

export const appRouter = Router();

appRouter.use("/auth", authRouter);