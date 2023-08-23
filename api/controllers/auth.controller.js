import errorWrapper from "express-async-handler";
import User from "../models/User.model.js";
import { checkPasswordRegExp, validateInputs } from "../utils/helpers/input.helper.js";
import Message from "../utils/message/message.util.js";
import CustomError from "../utils/error/CustomError.js";
import { sendTokenToCookie } from "../utils/helpers/token.helper.js";
import { sendEmailVerificationLink } from "../services/email/email.service.js";
import bcrypt from "bcryptjs";

export const signUp = errorWrapper(async(req, res, next) => {

    const {email, password, gender, dateOfBirth} = req.body;

    if(!validateInputs(email, password, gender, dateOfBirth)){
        return next(new CustomError(400, Message.BlankInputs));
    }

    if(!checkPasswordRegExp(password)){
        return next(new CustomError(400, Message.InvalidPasswordFormat));
    }
    
    const user = await User.create({
        email: email,
        password: password,
        gender: gender,
        dateOfBirth: dateOfBirth     
    });

    sendEmailVerificationLink(user, next);
    
    sendTokenToCookie(user, res);

});

export const signIn = errorWrapper(async(req, res, next) => {

    const {email, password} = req.body;

    if(!validateInputs(email, password)){
        return next(new CustomError(400, Message.BlankInputs));
    }

    const user = req.queryResult;

    if(!bcrypt.compareSync(password, user.password)){
        return next(new CustomError(401, Message.InvalidCredentials));
    }

    if(user.isActive === false && user.isBlocked !== true){

        await user.save({isActive: true});
    }

    sendTokenToCookie(user, res);

});

export const sendEmailVerificationEmail = errorWrapper(async(req, res, next) => {

    const user = req.queryResult;

    if(user.isEmailVerified){
        return next(new CustomError(400, Message.EmailAlreadyVerified));
    }

    sendEmailVerificationLink(user, next);

    return res
    .status(200)
    .json({
        success: true,
        message: Message.EmailVerificationLinkSent
    });

});