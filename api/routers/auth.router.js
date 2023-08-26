import { Router } from "express";
import { signUp, signIn, sendEmailVerificationEmail, verifyEmail, changeEmail, passwordChange, forgotPassword, resetPassword, addPhoneNumber, sendPhoneVerification, verifyPhone, validatePhoneCode, enableTwoFactorAuth, verifyTwoFactorAuth, validateTwoFactorAuth } from "../controllers/auth.controller.js";
import { checkUserExists } from "../middlewares/query/query.middleware.js";
import passport from "passport";

export const authRouter = Router();

const isAuth = passport.authenticate("jwt", {session: false});

authRouter.post("/sign/up", signUp);
authRouter.post("/sign/in", checkUserExists, signIn);
authRouter.post("/email/verification/send", checkUserExists, sendEmailVerificationEmail);
authRouter.get("/email/verification/verify", verifyEmail);
authRouter.patch("/email/change", isAuth, changeEmail);
authRouter.patch("/password/change", isAuth, passwordChange);
authRouter.post("/password/forgot", checkUserExists, forgotPassword);
authRouter.patch("/password/reset", resetPassword);
authRouter.post("/phone/add", isAuth, addPhoneNumber);
authRouter.get("/phone/send", isAuth, sendPhoneVerification);
authRouter.post("/phone/verify", isAuth, verifyPhone);
authRouter.post("/phone/validate", isAuth, validatePhoneCode);
authRouter.get("/2fa/enable", isAuth, enableTwoFactorAuth);
authRouter.post("/2fa/verify", isAuth, verifyTwoFactorAuth);
authRouter.post("/2fa/validate", validateTwoFactorAuth);