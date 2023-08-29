import { Router } from "express";
import passport from "passport";
import { createProduct, updateProduct } from "../controllers/product.controller.js";
import { checkProductExists } from "../middlewares/query/query.middleware.js";

export const productRouter = Router();

productRouter.use(passport.authenticate("jwt", {session: false}));

productRouter.post("/create", createProduct);
productRouter.patch("/update/:uuid", checkProductExists, updateProduct);