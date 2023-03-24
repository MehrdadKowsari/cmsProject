import { CRUDResultEnum } from '../enums/crudResultEnum';
import { MethodError } from './methodError';

export class CRUDResultModel {
    public type: CRUDResultEnum;
    public typeString: string;
    public message: string;
    public messageCode: number;
    public errors: MethodError[];
}
