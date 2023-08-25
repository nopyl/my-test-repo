import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateRandomToken } from "../../utils/helpers/token.helper.js";
import { MailOption } from "./MailOption.js";
import { MailInfo } from "./MailInfo.js";
import bcrypt from "bcryptjs";

dotenv.config({ path: "./config/config.env" });

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} = process.env;

const transport = nodemailer.createTransport({

    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }

});

const sendMail = (option) => {

    transport.sendMail(option);
}

export const sendEmailVerificationLink = async(user, next) => {

    const {DOMAIN, EMAIL_VERIFICATION_TOKEN_EXPIRES} = process.env;
    const randomToken = generateRandomToken(25);
    const link = `${DOMAIN}/auth/email/verify?emailVerificationToken=${randomToken}`;

    try{
        user.emailCode = randomToken;
        user.emailCodeExpires = new Date(Date.now() + Number(EMAIL_VERIFICATION_TOKEN_EXPIRES));
        
        await user.save();
    }
    catch(err){
        next(err);
    }

    const option = new MailOption(
        user.email, 
        MailInfo.EmailVerificationSubject, 
        MailInfo.EmailVerificationBody(link)
    );

    sendMail(option);

}

export const sendResetPasswordLink = async(user, next) => {

    const {DOMAIN, RESET_PASSWORD_TOKEN_EXPIRES} = process.env;

    const randomToken = generateRandomToken(25);
    const hash = bcrypt.hashSync(randomToken, bcrypt.genSaltSync());

    const link = `${DOMAIN}/auth/password/reset?resetPasswordToken=${hash}`;

    try{
        
        user.resetPasswordToken = hash;
        user.resetPasswordTokenExpires = new Date(Date.now() + Number(RESET_PASSWORD_TOKEN_EXPIRES));
        
        await user.save();
    }
    catch(err){
        return next(err);
    }

    const option = new MailOption(
        user.email,
        MailInfo.ResetPasswordSubject,
        MailInfo.ResetPasswordLink(link)
    );

    sendMail(option);

}