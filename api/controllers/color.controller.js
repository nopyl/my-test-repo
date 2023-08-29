import Color from "../models/Color.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import {capitalize} from "../utils/helpers/input.helper.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";
import { SuccessDataResult } from "../utils/result/SuccessDataResult.js";

export const createColor = errorWrapper(async(req, res, next) => {

    const {colorName} = req.body;

    if(!colorName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await Color.create({
        colorName: capitalize(colorName),
        userUuid: req.user.uuid
    });

    return res
    .status(200)
    .json(new SuccessResult(Message.ColorCreated));

});

export const updateColor = errorWrapper(async(req, res, next) => {

    const {colorName} = req.body;
    const color = req.queryResult;

    if(!colorName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await color.update({
        colorName: capitalize(colorName)
    });

    return res
    .status(200)
    .json(new SuccessResult(Message.ColorUpdated));

});

export const deleteColor = errorWrapper(async(req, res, next) => {

    const color = req.queryResult;

    await color.destroy();

    return res
    .status(200)
    .json(new SuccessResult(Message.ColorDeleted));

});

export const getColorById = errorWrapper(async(req, res, next) => {

    const color = req.queryResult;

    return res
    .status(200)
    .json(new SuccessDataResult(null, color));

});

export const getAllColors = errorWrapper(async(req, res, next) => {

    const colors = await Color.findAll();

    return res
    .status(200)
    .json(new SuccessDataResult(null, colors));

});