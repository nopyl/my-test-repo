import User from "../../models/User.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../../utils/error/CustomError.js";
import Message from "../../utils/message/message.util.js";

export const checkUserExists = errorWrapper(async(req, res, next) => {

    let key = req.body.email;

    if(!key){
        return next(new CustomError(400, Message.UserNotFound));
    }

    const user = await User.findOne({
        where: {
            email: key
        },
    });

    if(!user){
        return next(new CustomError(404, Message.UserNotFound));
    }

    req.queryResult = user;

    next();

});