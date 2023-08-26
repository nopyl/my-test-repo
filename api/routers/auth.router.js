import { Router } from "express";
import { signUp, signIn, sendEmailVerificationEmail, verifyEmail, changeEmail, passwordChange, forgotPassword, resetPassword, addPhoneNumber, sendPhoneVerification, verifyPhone, validatePhoneCode, enableTwoFactorAuth, verifyTwoFactorAuth } from "../controllers/auth.controller.js";
import { checkUserExists } from "../middlewares/query/query.middleware.js";
import passport from "passport";

export const authRouter = Router();

const isAuth = passport.authenticate("jwt", {session: false});

authRouter.post("/sign/up", signUp);
authRouter.post("/sign/in", checkUserExists, signIn);
authRouter.post("/email/verification/send", checkUserExists, sendEmailVerificationEmail);
authRouter.get("/email/verification/verify", verifyEmail);
authRouter.patch("/email/change", passport.authenticate("jwt", {session: false}), changeEmail);
authRouter.patch("/password/change",  passport.authenticate("jwt", {session: false}), passwordChange);
authRouter.post("/password/forgot", checkUserExists, forgotPassword);
authRouter.patch("/password/reset", resetPassword);
authRouter.post("/phone/add", passport.authenticate("jwt", {session: false}), addPhoneNumber);
authRouter.get("/phone/send", passport.authenticate("jwt", {session: false}), sendPhoneVerification);
authRouter.post("/phone/verify", passport.authenticate("jwt", {session: false}), verifyPhone);
authRouter.post("/phone/validate", passport.authenticate("jwt", {session: false}), validatePhoneCode);
authRouter.get("/2fa/enable", passport.authenticate("jwt", {session: false}), enableTwoFactorAuth);
authRouter.post("/2fa/verify", isAuth, verifyTwoFactorAuth);