import { Router } from "express";
import passport from "passport";
import { createReview } from "../controllers/review.controller.js";

export const reviewRouter = Router({mergeParams: true});

const isAuth = passport.authenticate("jwt", { session: false });

reviewRouter.post("/create", isAuth, createReview);