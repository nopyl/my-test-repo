import { Router } from "express";
import passport from "passport";
import { createCategory, updateCategory } from "../controllers/category.controller.js";
import { checkCategoryExists } from "../middlewares/query/query.middleware.js";

export const categoryRouter = Router();

categoryRouter.use(passport.authenticate("jwt", {session: false}));

categoryRouter.post("/create", createCategory);
categoryRouter.patch("/update/:uuid", checkCategoryExists, updateCategory);