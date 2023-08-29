import { Router } from "express";
import passport from "passport";
import { createColor } from "../controllers/color.controller.js";

export const colorRouter = Router();

colorRouter.use(passport.authenticate("jwt", {session: false}));

colorRouter.post("/create", createColor);