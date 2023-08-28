import Role from "../models/Role.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { capitalize } from "../utils/helpers/input.helper.js";

export const createRole = errorWrapper(async(req, res, next) => {

    const {roleName} = req.body;

    if(!roleName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await Role.create({
        roleName: capitalize(roleName)
    });

    return res
    .status(201)
    .json({
        success: true,
        message: Message.RoleCreated
    })

});

export const updateRole = errorWrapper(async(req, res, next) => {

    const {roleName} = req.body;
    const role = req.queryResult;

    if(!roleName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await role.update({roleName: capitalize(roleName)});

    return res
    .status(200)
    .json({
        success: true,
        message: Message.RoleUpdated
    })

});