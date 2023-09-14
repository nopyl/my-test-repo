import Role from "../../models/Role.model.js";
import User from "../../models/User.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../../utils/error/CustomError.js";
import Message from "../../utils/message/message.util.js";

export const getAdminAccess = errorWrapper(async(req, res, next) => {

    const user = await User.findOne({
        where: {
            uuid: req.user.uuid
        },
        include: {
            model: Role,
        }
    });

    for (let i = 0; i < user.Roles.length; i++) {

        if(user.Roles[i].dataValues.roleName === "Admin"){
            return next();
        }

    }

    return next(new CustomError(403, Message.Unauthorized));

});

export const getStaffAccess = errorWrapper(async(req, res, next) => {

    const user = await User.findOne({
        where: {
            uuid: req.user.uuid
        },
        include: {
            model: Role,
        }
    });

    for (let i = 0; i < user.Roles.length; i++) {

        if(user.Roles[i].dataValues.roleName === "Staff"){
            return next();
        }

    }

    return next(new CustomError(403, Message.Unauthorized));


});

export const getReviewOwnerAccess = errorWrapper(async(req, res, next) => {

    const review = req.queryResult;

    if(review.userUuid !== req.user.uuid){
        return next(new CustomError(403, Message.Unauthorized));
    }

    return next();

});

export const getAddressOwnerAccess = errorWrapper(async(req, res, next) => {

    const address = req.queryResult;

    if(address.userUuid !== req.user.uuid){
        return next(new CustomError(403, Message.Unauthorized));
    }

    next();

});