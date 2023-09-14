import Review from "../models/Review.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";
import { response } from "express";
import { SuccessDataResult } from "../utils/result/SuccessDataResult.js";

export const createReview = errorWrapper(async(req, res, next) => {

    const {starCount, message} = req.body;
    const product = req.queryResult;

    if(!starCount || !product){
        return next(new CustomError(400, Message.BlankInputs));
    }

    /* */

    const review = await Review.findOne({
        userUuid: req.user.uuid,
        productUuid: product.uuid
    });

    if(review){
        return next(new CustomError(400, Message.ReviewAlreadyCreated))
    }

    /* */

    await Review.create({
        starCount: starCount,
        message: message ? message : null,
        userUuid: req.user.uuid,
        productUuid: product.uuid
    });

    return res
    .status(201)
    .json(new SuccessResult(Message.ReviewCreated));

});

export const updateReview = errorWrapper(async(req, res, next) => {

    const {starCount, message} = req.body;
    const review = req.queryResult;

    if(!starCount && !message){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await review.update({starCount, message});
    
    return res
    .status(200)
    .json(new SuccessResult(Message.ReviewUpdated));

});

export const deleteReview = errorWrapper(async(req, res, next) => {

    const review = req.queryResult;

    await review.destroy();

    return res
    .status(200)
    .json(new SuccessResult(Message.ReviewDeleted));

});

export const getReviewById = errorWrapper(async(req, res, next) => {

    const review = req.queryResult;

    return res
    .status(200)
    .json(new SuccessDataResult(null, review));

});

export const getAllReviews = errorWrapper(async(req, res, next) => {

    const reviews = await Review.findAll();

    return res
    .status(200)
    .json(new SuccessDataResult(null, reviews));

});