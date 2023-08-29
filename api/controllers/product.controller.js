import Product from "../models/Product.model.js";
import errorWrapper from "express-async-handler";
import { validateInputs } from "../utils/helpers/input.helper.js";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";
import { SuccessDataResult } from "../utils/result/SuccessDataResult.js";

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
    .json(new SuccessDataResult(Message.ProductCreated, product));

});

export const updateProduct = errorWrapper(async(req, res, next) => {

    const updateInformations = req.body;
    const product = req.queryResult;

    const updatedProduct = await product.update(updateInformations);

    return res
    .status(200)
    .json(new SuccessDataResult(Message.ProductUpdated, updatedProduct));

});

export const deleteProduct = errorWrapper(async(req, res, next) => {
    
    const product = req.queryResult;

    await product.destroy();

    return res
    .status(200)
    .json(new SuccessResult(Message.ProductDeleted));

});

export const getProductById = errorWrapper(async(req, res, next) => {

    const product = req.queryResult;

    return res
    .status(200)
    .json(new SuccessDataResult(null, product));

});

export const getAllProducts = errorWrapper(async(req, res, next) => {
    
    const products = await Product.findAll();

    return res
    .status(200)
    .json(new SuccessDataResult(null, products));

});