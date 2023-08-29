import { Router } from "express";
import passport from "passport";
import { createCategory, updateCategory, deleteCategory, getCategoryById, getAllCategories } from "../controllers/category.controller.js";
import { checkCategoryExists } from "../middlewares/query/query.middleware.js";

export const categoryRouter = Router();

categoryRouter.use(passport.authenticate("jwt", {session: false}));

categoryRouter.post("/create", createCategory);
categoryRouter.patch("/update/:uuid", checkCategoryExists, updateCategory);
categoryRouter.delete("/delete/:uuid", checkCategoryExists, deleteCategory);
categoryRouter.get("/:uuid", checkCategoryExists, getCategoryById);
categoryRouter.get("/", getAllCategories);