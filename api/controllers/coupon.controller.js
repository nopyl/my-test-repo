import errorWrapper from "express-async-handler";
import Coupon from "../models/Coupon.model.js";
import { validateInputs } from "../utils/helpers/input.helper.js";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";
import Category from "../models/Category.model.js";
import { SuccessDataResult } from "../utils/result/SuccessDataResult.js";

export const createCoupon = errorWrapper(async(req, res, next) => {

    const {code, communityLimit, expireDate, categories} = req.body;

    if(!validateInputs(code, communityLimit, expireDate)){

        return next(new CustomError(400, Message.BlankInputs));
    }

    const coupon = await Coupon.create({
        code: code.toUpperCase(),
        communityLimit: communityLimit,
        expireDate: expireDate
    });

    if(categories) {

        //relation with specific categories
        await coupon.addCategory(categories);

    }
    else {
        
        //relation with all categories
        const allCategories = await Category.findAll({
            attributes: ["uuid"]
        });
        
        for (let i = 0; i < allCategories.length; i++) {
    
            const categoryUuid = allCategories[i].dataValues.uuid
            await coupon.addCategory(categoryUuid);
        
        }
    }

    return res
    .status(200)
    .json(new SuccessResult(Message.CouponCreated));

});

export const updateCoupon = errorWrapper(async(req, res, next) => {

    const {code, communityLimit, expireDate, categories} = req.body;
    const coupon = req.queryResult;

    if(!code && !communityLimit && !expireDate && !categories){
        return next(new CustomError(400, Message.BlankInputs));
    }

    //Will be refactored
    // if(categories){
    //     await coupon.removeCategories();
    // }

    await coupon.update({code, communityLimit, expireDate});

    return res
    .status(200)
    .json(new SuccessResult(Message.CouponUpdated));

});

export const deleteCoupon = errorWrapper(async(req, res, next) => {

    const coupon = req.queryResult;

    await coupon.destroy();

    return res
    .status(200)
    .json(new SuccessResult(Message.CouponDeleted));

});

export const getCouponById = errorWrapper(async(req, res, next) => {

    const coupon = req.queryResult;

    return res
    .status(200)
    .json(new SuccessDataResult(null, coupon));

});
