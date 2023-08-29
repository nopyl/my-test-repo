import { Result } from "./Result.js";

export class ErrorResult extends Result {

    constructor(message){
        super(false, message);
    }

}