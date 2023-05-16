import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UserDTO extends BaseModel {
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    phoneNumber?: string;
    userName: string;
    isCreatedByExternalAccount: boolean;
    isActive: boolean;
    image?: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

