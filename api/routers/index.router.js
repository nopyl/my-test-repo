import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { roleRouter } from "./role.router.js";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/role", roleRouter);