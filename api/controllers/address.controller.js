import errorWrapper from "express-async-handler";
import Address from "../models/Address.model.js";
import { validateInputs } from "../utils/helpers/input.helper.js";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";

export const createAddress = errorWrapper(async(req, res, next) => {

    const {title, city, town, street, buildingNumber, flatNumber, details} = req.body;

    if(!validateInputs(title, city, town, street, buildingNumber, flatNumber)){

        return next(new CustomError(400, Message.BlankInputs));
    }

    await Address.create({
        title: title,
        city: city,
        town: town,
        street: street,
        buildingNumber: buildingNumber,
        flatNumber: flatNumber,
        details: details,
        userUuid: req.user.uuid
    });

    return res
    .status(201)
    .json(new SuccessResult(Message.AddressCreated));


});