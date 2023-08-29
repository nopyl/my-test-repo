import { Result } from "./Result.js";

export class DataResult extends Result {

    constructor(success, message, data){
        super(success, message);
        this.data = data;
    }

}