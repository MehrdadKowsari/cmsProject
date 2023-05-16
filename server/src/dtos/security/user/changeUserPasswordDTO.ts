import { BaseModel } from "src/models/shared/base/baseModel";

export interface ChangeUserPasswordDTO extends BaseModel {
    newPassword: string;
    confirmNewPassword: string;
    currentPassword: string;
}
