import Review from "../models/Review.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";

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