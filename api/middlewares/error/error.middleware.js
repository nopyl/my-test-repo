import CustomError from "../../utils/error/CustomError.js"
import { ErrorResult } from "../../utils/result/ErrorResult.js";

export const errorHandler = (err, req, res, next) => {
    
    return res
    .status(err.status || 500)
    .json(new ErrorResult(err.message));
    
}