import errorWrapper from "express-async-handler";
import CreditCard from "../models/CreditCard.model.js";
import { validateInputs } from "../utils/helpers/input.helper.js";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";

export const createCreditCard = errorWrapper(async(req, res, next) => {

    const {cardOwner, cardNumber, expireDate, cvv} = req.body;

    if(!validateInputs(cardOwner, cardNumber, expireDate, cvv)){
        
        return next(new CustomError(400, Message.BlankInputs));
    }

    await CreditCard.create({
        cardOwner: cardOwner,
        cardNumber: cardNumber,
        expireDate: expireDate,
        cvv: cvv,
        userUuid: req.user.uuid
    });

    return res
    .status(200)
    .json(new SuccessResult(Message.CreditCardCreated));

});