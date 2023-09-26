import { BaseModel } from "../../../models/shared/base/baseModel";

export interface ChangeUserPasswordDTO extends BaseModel {
    newPassword: string;
    confirmNewPassword: string;
    currentPassword: string;
}
