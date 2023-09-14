import { Router } from "express";
import passport from "passport";
import { createReview, updateReview, deleteReview, getReviewById} from "../controllers/review.controller.js";
import { checkReviewExists } from "../middlewares/query/query.middleware.js";
import { getReviewOwnerAccess } from "../middlewares/auth/auth.middleware.js";

export const reviewRouter = Router({mergeParams: true});

const isAuth = passport.authenticate("jwt", { session: false });

reviewRouter.post("/create", isAuth, createReview);
reviewRouter.patch("/:reviewUuid/update", [isAuth, checkReviewExists, getReviewOwnerAccess], updateReview);
reviewRouter.delete("/:reviewUuid/delete", [isAuth, checkReviewExists, getReviewOwnerAccess], deleteReview);
reviewRouter.get("/:reviewUuid", checkReviewExists, getReviewById);