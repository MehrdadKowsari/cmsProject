import { CRUDResultModel } from './crudResultModel';

export class MethodResult<T> extends CRUDResultModel {
    constructor(resultModel: CRUDResultModel, result?: T | null){
        super(resultModel.type, resultModel.message, resultModel.errors);
        this.result = result ?? null;
    }
    public result?: T | null;

}

