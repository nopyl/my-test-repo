import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

export class MailInfo {
    
    // Fields
    static EmailVerificationSubject = "Email Verification";

    // Methods
    static EmailVerificationBody(link) {

        const expiresInMinutes = Number(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES) / 60000;
        return `Dear User, your email verification link is ${link}. This link is valid for ${expiresInMinutes} minutes.`;
    }

}