import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { roleRouter } from "./role.router.js";
import { colorRouter } from "./color.router.js";
import { brandRouter } from "./brand.router.js";
import { productRouter } from "./product.router.js";
import { categoryRouter } from "./category.router.js";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/role", roleRouter);
appRouter.use("/color", colorRouter);
appRouter.use("/brand", brandRouter);
appRouter.use("/product", productRouter);
appRouter.use("/category", categoryRouter);