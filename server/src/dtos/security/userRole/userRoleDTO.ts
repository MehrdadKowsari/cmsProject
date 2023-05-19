import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UserRoleDTO extends BaseModel {
    userId: string;
    userFullName: string;
    roleId: string;
    roleName: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

