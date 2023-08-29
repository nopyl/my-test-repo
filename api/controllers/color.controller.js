import Color from "../models/Color.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import {capitalize} from "../utils/helpers/input.helper.js";

export const createColor = errorWrapper(async(req, res, next) => {

    const {colorName} = req.body;

    if(!colorName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await Color.create({
        colorName: capitalize(colorName),
        userId: req.user.uuid
    });

    return res
    .status(200)
    .json({
        success: true,
        message: Message.ColorCreated
    });

});