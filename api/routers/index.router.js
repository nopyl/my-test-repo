import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { roleRouter } from "./role.router.js";
import { colorRouter } from "./color.router.js";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/role", roleRouter);
appRouter.use("/color", colorRouter);