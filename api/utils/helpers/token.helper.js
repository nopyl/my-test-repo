import crypto from "crypto";

export const sendTokenToCookie = (user, res) => {

    const { NODE_ENV, COOKIE_EXPIRES } = process.env;
    
    const jwt = user.generateJwt();

    return res
    .status(200)
    .cookie("jwt", jwt, {
        maxAge: COOKIE_EXPIRES,
        httpOnly: NODE_ENV === "development" ? true : false
    })
    .json({
        success: true
    });

}

export const generateRandomToken = (size) => {
    
    return crypto.randomBytes(size).toString("hex");
}