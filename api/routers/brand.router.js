import { Router } from "express";
import passport from "passport";
import { getStaffAccess } from "../middlewares/auth/auth.middleware.js";
import { createBrand, updateBrand, deleteBrand } from "../controllers/brand.controller.js";
import { checkBrandExists } from "../middlewares/query/query.middleware.js";

export const brandRouter = Router();

brandRouter.use([passport.authenticate("jwt", { session: false })]);

brandRouter.post("/create", createBrand);
brandRouter.patch("/update/:uuid", checkBrandExists, updateBrand);
brandRouter.delete("/delete/:uuid", checkBrandExists, deleteBrand);