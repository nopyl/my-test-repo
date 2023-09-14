import { Router } from "express";
import passport from "passport";
import { createAddress, updateAddress } from "../controllers/address.controller.js";
import { checkAddressExists } from "../middlewares/query/query.middleware.js";
import { getAddressOwnerAccess } from "../middlewares/auth/auth.middleware.js";

export const addressRouter = Router();

const isAuth = passport.authenticate("jwt", { session: false });

addressRouter.use(isAuth);

addressRouter.post("/create", createAddress);
addressRouter.patch("/:uuid/update", [checkAddressExists, getAddressOwnerAccess], updateAddress);