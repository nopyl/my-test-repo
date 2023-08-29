import { Router } from "express";
import passport from "passport";
import { createProduct } from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.use(passport.authenticate("jwt", {session: false}));

productRouter.post("/create", createProduct);