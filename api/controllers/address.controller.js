import errorWrapper from "express-async-handler";
import Address from "../models/Address.model.js";
import { validateInputs } from "../utils/helpers/input.helper.js";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";
import { SuccessDataResult } from "../utils/result/SuccessDataResult.js";

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

export const updateAddress = errorWrapper(async(req, res, next) => {

    const {title, city, town, street, buildingNumber, flatNumber, details} = req.body;
    const address = req.queryResult;
    
    if(!title && !city && !town && !street && !buildingNumber && !flatNumber && !details){                                                  
        //We need some information to update address and If there is no send information we'll throw error.
        return next(new CustomError(400, Message.BlankInputs));
    };

    await address.update({
        title, 
        city,
        town,
        street,
        buildingNumber,
        flatNumber,
        details
    });

    return res
    .status(200)
    .json(new SuccessResult(Message.AddressUpdated))


});

export const deleteAddress = errorWrapper(async(req, res, next) => {

    const address = req.queryResult;

    await address.destroy();

    return res
    .status(200)
    .json(new SuccessResult(Message.AddressDeleted));
});

export const getAddressById = errorWrapper(async(req, res, next) => {

    const address = req.queryResult;
    
    return res
    .status(200)
    .json(new SuccessDataResult(null, address));

});