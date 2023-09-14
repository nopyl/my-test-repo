import { Router } from "express";
import passport from "passport";
import { createCreditCard } from "../controllers/creditCard.controller.js";

export const creditCardRouter = Router();

const isAuth = passport.authenticate("jwt", { session: false });

creditCardRouter.use(isAuth);


creditCardRouter.post("/create", createCreditCard);