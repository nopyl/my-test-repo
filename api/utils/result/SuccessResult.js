import { Result } from "./Result.js";

export class SuccessResult extends Result {

    constructor(message){
        super(true, message);
    }

}