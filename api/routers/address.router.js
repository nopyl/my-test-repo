import { Router } from "express";
import passport from "passport";
import { createAddress } from "../controllers/address.controller.js";

export const addressRouter = Router();

const isAuth = passport.authenticate("jwt", { session: false });

addressRouter.use(isAuth);

addressRouter.post("/create", createAddress);