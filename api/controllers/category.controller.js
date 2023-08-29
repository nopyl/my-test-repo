import Category from "../models/Category.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { capitalize } from "../utils/helpers/input.helper.js";

export const createCategory = errorWrapper(async(req, res, next) => {

    const {categoryName} = req.body;

    if(!categoryName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await Category.create({
        categoryName: capitalize(categoryName),
        userUuid: req.user.uuid
    });

    return res
    .status(200)
    .json({
        success: true,
        message: Message.CategoryCreated
    });

});