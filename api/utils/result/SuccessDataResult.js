import { DataResult } from "./DataResult.js";

export class SuccessDataResult extends DataResult {

    constructor(message, data){
        super(true, message, data)
    }

}