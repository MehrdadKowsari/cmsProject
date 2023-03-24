import { BaseModel } from "../../shared/base/baseModel";

export interface UserDTO extends BaseModel {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
    passwordConfirm: string;
    isActive: boolean;
}

