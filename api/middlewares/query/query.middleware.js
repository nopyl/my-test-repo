import User from "../../models/User.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../../utils/error/CustomError.js";
import Message from "../../utils/message/message.util.js";
import Role from "../../models/Role.model.js";
import Color from "../../models/Color.model.js";

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

export const checkRoleExists = errorWrapper(async(req, res, next) => {

    const {uuid} = req.params;

    if(!uuid){
        return next(new CustomError(400, Message.NullUuid));
    }

    const role = await Role.findByPk(uuid);

    if(!role){
        return next(new CustomError(404, Message.RoleNotFound));
    }

    req.queryResult = role;

    next();

});

export const checkColorExists = errorWrapper(async(req, res, next) => {

    const {uuid} = req.params;

    if(!uuid){
        return next(new CustomError(400, Message.NullUuid));
    }
    
    const color = await Color.findByPk(uuid);

    if(!color){
        return next(new CustomError(404, Message.ColorNotFound));
    }

    req.queryResult = color;

    next();

});