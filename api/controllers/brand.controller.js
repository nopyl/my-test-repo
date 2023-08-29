import Brand from "../models/Brand.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { capitalize } from "../utils/helpers/input.helper.js";

export const createBrand = errorWrapper(async(req, res, next) => {

    const {brandName} = req.body;

    if(!brandName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await Brand.create({
        brandName: capitalize(brandName),
        userUuid: req.user.uuid
    });

    return res
    .status(201)
    .json({
        success: true,
        message: Message.BrandCreated
    });

});

export const updateBrand = errorWrapper(async(req, res, next) => {

    const {brandName} = req.body;
    const brand = req.queryResult;

    if(!brandName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await brand.update({
        brandName: capitalize(brandName)
    });

    return res
    .status(200)
    .json({
        success: true,
        message: Message.BrandUpdated
    })


});

export const deleteBrand = errorWrapper(async(req, res, next) => {

    const brand = req.queryResult;

    await brand.destroy();

    return res
    .status(200)
    .json({
        success: true,
        message: Message.BrandDeleted
    });

});