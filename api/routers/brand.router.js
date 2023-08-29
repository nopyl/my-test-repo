import { Router } from "express";
import passport from "passport";
import { getStaffAccess } from "../middlewares/auth/auth.middleware.js";
import { createBrand } from "../controllers/brand.controller.js";

export const brandRouter = Router();

brandRouter.use([passport.authenticate("jwt", { session: false })]);

brandRouter.post("/create", createBrand);