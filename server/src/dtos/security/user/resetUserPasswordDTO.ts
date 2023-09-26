import { BaseModel } from "../../../models/shared/base/baseModel";

export interface ResetUserPasswordDTO extends BaseModel {
    password: string;
    confirmPassword: string;
}
