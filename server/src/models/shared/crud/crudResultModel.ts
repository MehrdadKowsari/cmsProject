import { CRUDResultEnum, CRUDResultEnumLabelMapping } from '../enums/crudResultEnum';
import { MethodError } from './methodError';

export class CRUDResultModel {
    constructor(type:CRUDResultEnum, message?: string, errors?: MethodError[]){
        this.type = type;
        this.typeString = CRUDResultEnumLabelMapping[type];
        this.message = message;
        this.errors = errors;
    }
    
    public type: CRUDResultEnum;
    public typeString: string;
    public message?: string;
    public errors?: MethodError[];
}

