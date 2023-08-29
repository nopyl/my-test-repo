import { Router } from "express";
import passport from "passport";
import { createCategory } from "../controllers/category.controller.js";

export const categoryRouter = Router();

categoryRouter.use(passport.authenticate("jwt", {session: false}));

categoryRouter.post("/create", createCategory);