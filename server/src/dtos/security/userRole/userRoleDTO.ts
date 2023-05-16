import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UserRoleDTO extends BaseModel {
    userId: string;
    roleId: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

