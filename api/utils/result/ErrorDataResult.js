import { DataResult } from "./DataResult.js";

export class ErrorDataResult extends DataResult {

    constructor(message, data){
        super(false, message, data);
    }

}