import { Router } from "express";
import passport from "passport";
import { getAdminAccess } from "../middlewares/auth/auth.middleware.js"
import { createCoupon, deleteCoupon, updateCoupon, getCouponById, getAllCoupons } from "../controllers/coupon.controller.js";
import { checkCouponExists } from "../middlewares/query/query.middleware.js";

export const couponRouter = Router();

const isAuth = passport.authenticate("jwt", { session: false });

couponRouter.use([isAuth, getAdminAccess]);

couponRouter.post("/create", createCoupon);
couponRouter.patch("/:uuid/update", checkCouponExists, updateCoupon);
couponRouter.delete("/:uuid/delete", checkCouponExists, deleteCoupon);
couponRouter.get("/:uuid", checkCouponExists, getCouponById);
couponRouter.get("/", getAllCoupons);