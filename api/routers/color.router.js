import { Router } from "express";
import passport from "passport";
import { createColor, updateColor, deleteColor, getColorById, getAllColors } from "../controllers/color.controller.js";
import { checkColorExists } from "../middlewares/query/query.middleware.js";

export const colorRouter = Router();

colorRouter.use(passport.authenticate("jwt", {session: false}));

colorRouter.post("/create", createColor);
colorRouter.patch("/update/:uuid", checkColorExists, updateColor)
colorRouter.delete("/delete/:uuid", checkColorExists, deleteColor);
colorRouter.get("/:uuid", checkColorExists, getColorById);
colorRouter.get("/", getAllColors);