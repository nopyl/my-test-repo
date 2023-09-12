import { Router } from "express";
import passport from "passport";
import { createProduct, updateProduct, deleteProduct, getProductById, getAllProducts } from "../controllers/product.controller.js";
import { checkProductExists } from "../middlewares/query/query.middleware.js";
import { reviewRouter } from "./review.router.js";

export const productRouter = Router();

productRouter.use(passport.authenticate("jwt", {session: false}));

productRouter.post("/create", createProduct);
productRouter.patch("/update/:uuid", checkProductExists, updateProduct);
productRouter.delete("/delete/:uuid", checkProductExists, deleteProduct);
productRouter.get("/:uuid", checkProductExists, getProductById);
productRouter.get("/", getAllProducts);

//Review Routes
productRouter.use("/:uuid/review", checkProductExists, reviewRouter);