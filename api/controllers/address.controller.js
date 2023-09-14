import errorWrapper from "express-async-handler";
import Address from "../models/Address.model.js";
import { validateInputs } from "../utils/helpers/input.helper.js";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";

export const createAddress = errorWrapper(async(req, res, next) => {

    const {city, town, street, buildingNumber, flatNumber} = req.body;

    if(!validateInputs(city, town, street, buildingNumber, flatNumber)){

        return next(new CustomError(400, Message.BlankInputs));
    }

    await Address.create({
        city: city,
        town: town,
        street: street,
        buildingNumber: buildingNumber,
        flatNumber: flatNumber

    });

    return res
    .status(201)
    .json(new SuccessResult(Message.AddressCreated))


});