import Product from "../models/Product.model.js";
import errorWrapper from "express-async-handler";
import { validateInputs } from "../utils/helpers/input.helper.js";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";

export const createProduct = errorWrapper(async(req, res, next) => {

    const {
        brandUuid, 
        productName, 
        description, 
        price, 
        quantityInStock 
    } = req.body;

    if(!validateInputs(brandUuid, productName, description, price, quantityInStock)){

        return next(new CustomError(400, Message.BlankInputs));
    }

    const product = await Product.create({
        brandUuid: brandUuid,
        productName: productName,
        description: description,
        price: price,
        quantityInStock: quantityInStock,
        userUuid: req.user.uuid
    });

    return res
    .status(201)
    .json({
        success: true,
        product: product,
        message: Message.ProductCreated
    });

});

export const updateProduct = errorWrapper(async(req, res, next) => {

    const updateInformations = req.body;
    const product = req.queryResult;

    const updatedProduct = await product.update(updateInformations);

    return res
    .status(200)
    .json({
        success: true,
        product: updatedProduct,
        message: Message.ProductUpdated
    });

});
