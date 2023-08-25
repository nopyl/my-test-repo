import AWS from "aws-sdk";
import dotenv from "dotenv";
import { generateRandomInt } from "../../utils/helpers/token.helper.js";
import { SmsOption } from "./SmsOption.js";
import { SmsInfo } from "./SmsInfo.js";
import Message from "../../utils/message/message.util.js";
import CustomError from "../../utils/error/CustomError.js";

dotenv.config({ path: "./config/config.env" });

const {AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY} = process.env;

AWS.config.update({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});

const sendSms = (smsOption) => {

    return new AWS.SNS()
    .publish(smsOption)
    .promise()
    .then()
    .catch(err => console.log(err));

}

export const sendPhoneVerificationCode = async(user, next) => {

    const {PHONE_VERIFICATION_CODE_EXPIRES} = process.env;
    
    const otp = generateRandomInt(6);

    try{
        user.phoneNumberCode = otp;
        user.phoneNumberCodeExpires = new Date(Date.now() + Number(PHONE_VERIFICATION_CODE_EXPIRES));
    
        await user.save();
    }
    catch(err){
        return next(err);
    }

    const option = new SmsOption(
        user.phoneNumber,
        SmsInfo.phoneVerificationMessage(otp)
    );

    sendSms(option);

}

export const phoneCodeValidation = async(user, phoneCode, next) => {

    if(user.phoneNumberCode !== phoneCode){

        return next(new CustomError(400, Message.InvalidPhoneCode));

    } 

    if(user.phoneNumberCodeExpires < Date.now()){

        return next(new CustomError(400, Message.PhoneCodeExpired));
    }

}