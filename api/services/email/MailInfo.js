import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

export class MailInfo {
    
    // Fields
    static EmailVerificationSubject = "Email Verification";
    static ResetPasswordSubject = "Reset Password"

    // Methods
    static EmailVerificationBody(link) {

        const expiresInMinutes = Number(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES) / 60000;
        return `Dear User, your email verification link is ${link}. This link is valid for ${expiresInMinutes} minutes.`;
    }

    static ResetPasswordLink(link) {
        const expiresInMinutes = Number(process.env.RESET_PASSWORD_TOKEN_EXPIRES) / 60000;
        return `Dear User, your reset password link is ${link}. This link is valid for ${expiresInMinutes} minutes.`
    }

}