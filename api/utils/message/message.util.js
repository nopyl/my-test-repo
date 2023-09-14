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
    static ResetPasswordTokenExpired = "Reset password token expired";
    static ResetPasswordTokenNotFound = "Reset password token can not be null";
    static CircularEmail = "The e-mail address of your account is the same as the e-mail address you want to change";
    static InvalidPhoneFormat = "Invalid phone number format";
    static PhoneVerificationCodeSent = "Phone verification code has been successfully sent";
    static InvalidPhoneCode = "Invalid phone code";
    static PhoneCodeExpired = "Phone code expired";
    static PhoneNumberVerified = "Phone number has been successfully verified";
    static PhoneAlreadyVerified = "Your phone number is already verified";
    static InvalidCode = "Invalid two factor authentication code";
    static TwoFactorAuthAlreadyEnabled = "Two factor authentication is already enabled";
    static TwoFactorAuthEnabled = "Two factor authentication has been successfully enabled";
    static TwoFactorAuthNotEnabled = "Two factor authentication is not enabled";
    static TwoFactorAuthDisabled = "Two factor authentication has been successfully disabled";
    static RoleCreated = "Role has been successfully created";
    static NullUuid = "UUID can not be null";
    static RoleNotFound = "Role not found";
    static RoleUpdated = "Role has been succesfully updated";
    static RoleDeleted = "Role has been successfully deleted";
    static ColorCreated = "Color has been successfully created";
    static ColorNotFound = "Color not found";
    static ColorUpdated = "Color has been successfully updated";
    static ColorDeleted = "Color has been successfully deleted";
    static BrandCreated = "Brand has been successfully created";
    static BrandNotFound = "Brand not found";
    static BrandUpdated = "Brand has been successfully updated";
    static BrandDeleted = "Brand has been successfully deleted";
    static ProductCreated = "Product has been successfully created";
    static ProductNotFound = "Product not found";
    static ProductUpdated = "Product has been successfully updated";
    static ProductDeleted = "Product has been successfully deleted";
    static CategoryCreated = "Category has been successfully created";
    static CategoryNotFound = "Category not found";
    static CategoryUpdated = "Category has been successfully updated";
    static CategoryDeleted = "Category has been successfully deleted";
    static ReviewStarValidationError = "Review star must be between 1 and 5";
    static ReviewCreated = "Review has been successfully started";
    static ReviewAlreadyCreated = "You have already created a review";
    static ReviewNotFound = "Review not found";
    static ReviewUpdated = "Review has been successfully updated";
    static ReviewDeleted = "Review has been successully deleted";
    static CouponCreated = "Coupon has been successfully created";
    static CouponNotFound = "Coupon not found";
    static CouponUpdated = "Coupon has been succesfully updated";
    static CouponDeleted = "Coupon has been successfully deleted";
    static AddressCreated = "Address has been successfully created";
    static AddressNotFound = "Address not found";
    static AddressUpdated = "Address has been successfully updated";
    static AddressDeleted = "Address has been successfully deleted";
}

export default Message;