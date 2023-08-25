class Message {
    static ServerIsUp = "Server is up";
    static DatabaseConnectionSuccess = "Database connection successfull";
    static BlankInputs = "Please provide all inputs";
    static InvalidPasswordFormat = "Password must contain: Minimum eight characters, at least one letter and one number.";
    static Unauthorized = "Unauthorized";
    static UserNotFound = "User not found";
    static InvalidCredentials = "Invalid credentials";
    static EmailVerificationLinkSent = "Email verification link has been successfully sent";
    static EmailAlreadyVerified = "Email has already been verified";
    static EmailVerificationTokenExpired = "Email verification token expired";
    static EmailVerified = "Email has been successfully verified";
    static PasswordsDoNotMatch = "Passwords do not match";
    static PasswordChanged = "Password has been successfully changed";
    static ResetPasswordLinkSent = "Reset Password link has been successfully sent";
}

export default Message;