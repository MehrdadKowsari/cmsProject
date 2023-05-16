import { BaseModel } from "src/models/shared/base/baseModel";

export interface ResetUserPasswordDTO extends BaseModel {
    password: string;
    confirmPassword: string;
}
