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

    console.log(user.Roles);

    for (let i = 0; i < user.Roles.length; i++) {

        if(user.Roles[i].dataValues.roleName === "Admin"){
            console.log(user.Roles[i].dataValues.roleName)
            return next();
        }

    }

    return next(new CustomError(403, Message.Unauthorized));

});