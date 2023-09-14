import { Router } from "express";
import passport from "passport";
import { createCreditCard, updateCreditCard } from "../controllers/creditCard.controller.js";
import { checkCreditCardExists } from "../middlewares/query/query.middleware.js";
import { getCreditCardOwnerAccess } from "../middlewares/auth/auth.middleware.js";

export const creditCardRouter = Router();

const isAuth = passport.authenticate("jwt", { session: false });

creditCardRouter.use(isAuth);


creditCardRouter.post("/create", createCreditCard);
creditCardRouter.patch("/:uuid/update", checkCreditCardExists, getCreditCardOwnerAccess, updateCreditCard);