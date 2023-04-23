import { StatusCodes } from 'http-status-codes';
import { MethodResult } from './methodResult';

export class RequestResult<T>{
    constructor(statusCode: StatusCodes, methodResult: MethodResult<T>){
        this.statusCode = statusCode;
        this.methodResult = methodResult;
    }
    public methodResult: MethodResult<T>;
    public statusCode: StatusCodes;

}

