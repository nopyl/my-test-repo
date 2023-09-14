import { Router } from "express";
import passport from "passport";
import { getAdminAccess } from "../middlewares/auth/auth.middleware.js"
import { createCoupon } from "../controllers/coupon.controller.js";

export const couponRouter = Router();

const isAuth = passport.authenticate("jwt", { session: false });

couponRouter.use([isAuth, getAdminAccess]);

couponRouter.post("/create", createCoupon);