import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const {PHONE_VERIFICATION_CODE_EXPIRES} = process.env;

export class SmsInfo {
    
    static phoneVerificationMessage(code){

        const expiresInMinutes = Number(PHONE_VERIFICATION_CODE_EXPIRES) / 60000;
        return `Dear User, your phone verification code is ${code}. This code is only valid for ${expiresInMinutes} minutes`;
    }

}