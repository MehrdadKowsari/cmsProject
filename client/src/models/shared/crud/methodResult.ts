import { CRUDResultModel } from './crudResultModel';

export class MethodResult<T> extends CRUDResultModel {
    public result?: T;
}

