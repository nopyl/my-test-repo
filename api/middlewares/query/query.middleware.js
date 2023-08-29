import User from "../../models/User.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../../utils/error/CustomError.js";
import Message from "../../utils/message/message.util.js";
import Role from "../../models/Role.model.js";
import Color from "../../models/Color.model.js";
import Brand from "../../models/Brand.model.js";
import Product from "../../models/Product.model.js";
import Category from "../../models/Category.model.js";

export const checkUserExists = errorWrapper(async(req, res, next) => {

    let key = req.body.email;

    if(!key){
        return next(new CustomError(400, Message.UserNotFound));
    }

    const user = await User.findOne({
        where: {
            email: key
        },
    });

    if(!user){
        return next(new CustomError(404, Message.UserNotFound));
    }

    req.queryResult = user;

    next();

});

export const checkRoleExists = errorWrapper(async(req, res, next) => {

    const {uuid} = req.params;

    if(!uuid){
        return next(new CustomError(400, Message.NullUuid));
    }

    const role = await Role.findByPk(uuid);

    if(!role){
        return next(new CustomError(404, Message.RoleNotFound));
    }

    req.queryResult = role;

    next();

});

export const checkColorExists = errorWrapper(async(req, res, next) => {

    const {uuid} = req.params;

    if(!uuid){
        return next(new CustomError(400, Message.NullUuid));
    }
    
    const color = await Color.findByPk(uuid);

    if(!color){
        return next(new CustomError(404, Message.ColorNotFound));
    }

    req.queryResult = color;

    next();

});

export const checkBrandExists = errorWrapper(async(req, res, next) => {

    const {uuid} = req.params;

    if(!uuid){
        return next(new CustomError(400, Message.NullUuid));
    }
    
    const brand = await Brand.findByPk(uuid);

    if(!brand){
        return next(new CustomError(404, Message.ColorNotFound));
    }

    req.queryResult = brand;

    next();

});

export const checkProductExists = errorWrapper(async(req, res, next) => {

    const {uuid} = req.params;

    if(!uuid){
        return next(new CustomError(400, Message.NullUuid));
    }

    const product = await Product.findOne({
        where: {
            uuid: uuid
        }
    });

    if(!product){
        return next(new CustomError(404, Message.ProductNotFound));
    }

    req.queryResult = product;
    next();

});

export const checkCategoryExists = errorWrapper(async(req, res, next) => {

    const {uuid} = req.params;
    
    if(!uuid){
        return next(new CustomError(400, Message.NullUuid));
    }

    const category = await Category.findOne({
        where: {
            uuid: uuid
        }
    });

    if(!category){
        return next(new CustomError(404, Message.CategoryNotFound));
    }

    req.queryResult = category;
    next();

});