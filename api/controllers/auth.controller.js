import errorWrapper from "express-async-handler";
import User from "../models/User.model.js";
import { checkPasswordRegExp, checkPhoneRegExp, validateInputs } from "../utils/helpers/input.helper.js";
import Message from "../utils/message/message.util.js";
import CustomError from "../utils/error/CustomError.js";
import { sendTokenToCookie } from "../utils/helpers/token.helper.js";
import { sendEmailVerificationLink, sendResetPasswordLink } from "../services/email/email.service.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { sendPhoneVerificationCode } from "../services/sms/sms.service.js";

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

export const verifyEmail = errorWrapper(async(req, res, next) => {

    const {emailVerificationToken} = req.query;

    if(!emailVerificationToken){
        return next(new CustomError(400, Message.UserNotFound));
    }

    const user = await User.findOne({
        where: {
            emailCode: emailVerificationToken
        }
    });

    if(!user){
        return next(new CustomError(400, Message.UserNotFound));
    }

    if(user.emailCodeExpires < Date.now()){
        return next(new CustomError(400, Message.EmailVerificationTokenExpired));
    }

    user.emailCode = null;
    user.emailCodeExpires = null;
    user.isEmailVerified = true;

    await user.save();

    return res
    .status(200)
    .json({
        success: true,
        message: Message.EmailVerified
    });

});

export const changeEmail = errorWrapper(async(req, res, next) => {

    //To be refactored

    const {email} = req.body; 
    const user = req.user;

    if(!email){
        return next(new CustomError(400, Message.BlankInputs));
    }

    if(user.email === email){
        return next(new CustomError(400, Message.CircularEmail))
    }

    const isEmailExists = await User.count({
        where: {
            email: email
        }
    });

    if(isEmailExists > 0){
        return next(new CustomError(400, Message.EmailAlreadyInUse));
    }   

    user.email = email;
    user.isEmailVerified = false;
    // user.lastEmailChanged = Date.now();

    sendEmailVerificationLink(user, next);

    return res
    .status(200)
    .json({
        success: true,
        message: Message.EmailVerificationLinkSent
    });

});

export const passwordChange = errorWrapper(async(req, res, next) => {


    const {oldPassword, newPassword, newPasswordRepeat} = req.body;
    
    const user = req.user;

    if(!validateInputs(oldPassword, newPassword, newPasswordRepeat)){
        
        return next(new CustomError(400, Message.BlankInputs));
    }
    
    if(newPassword !== newPasswordRepeat){
        return next(new CustomError(400, Message.PasswordsDoNotMatch))
    }
    
    if(!checkPasswordRegExp(newPassword)){
        
        return next(new CustomError(400, Message.InvalidPasswordFormat));
    }
 
    if(!bcrypt.compareSync(oldPassword, user.password)){
        
        return next(new CustomError(401, Message.InvalidCredentials));
    }

    user.password = newPassword;
    user.lastPasswordChangedAt = Date.now();
    await user.save();

    return res
    .status(200)
    .json({
        success: true,
        message: Message.PasswordChanged
    });

});

export const forgotPassword = errorWrapper(async(req, res, next) => {

    const user = req.queryResult;

    sendResetPasswordLink(user);

    return res
    .status(200)
    .json({
        success: true,
        message: Message.ResetPasswordLinkSent
    });

});

export const resetPassword = errorWrapper(async(req, res, next) => {

    const { resetPasswordToken } = req.query;
    const { password, passwordRepeat } = req.body;
    
    if(!resetPasswordToken){
        
        return next(new CustomError(400, Message.ResetPasswordTokenNotFound));
    }

    if(!validateInputs(password, passwordRepeat)){
        return next(new CustomError(400, Message.BlankInputs));
    }

    const user = await User.findOne({
        where: {
            resetPasswordToken: resetPasswordToken
        }
    });

    if(!user){
        return next(new CustomError(404, Message.UserNotFound));
    }

    if(user.resetPasswordTokenExpires < Date.now()){
        
        return next(new CustomError(400, Message.ResetPasswordTokenExpired));
    }

    if(password !== passwordRepeat){

        return next(new CustomError(400, Message.PasswordsDoNotMatch));
    }

    if(!checkPasswordRegExp(password)){
        return next(new CustomError(400, Message.InvalidPasswordFormat));
    }

    user.password = password;
    user.lastPasswordChangedAt = Date.now();

    await user.save();

    return res
    .status(200)
    .json({
        success: true,
        message: Message.PasswordChanged
    });
    
});

export const addPhoneNumber = errorWrapper(async(req, res, next) => {

    const {phoneNumber} = req.body;
    const user = req.user;

    if(!checkPhoneRegExp(phoneNumber)){
        
        return next(new CustomError(400, Message.InvalidPhoneFormat));
    }

    user.phoneNumber = phoneNumber;

    sendPhoneVerificationCode(user, next);

    return res
    .status(200)
    .json({
        success: true,
        message: Message.PhoneVerificationCodeSent
    })

});
