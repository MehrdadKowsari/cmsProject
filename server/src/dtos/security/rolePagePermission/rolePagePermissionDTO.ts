import { BaseModel } from "../../../models/shared/base/baseModel";

export interface RolePagePermissionDTO extends BaseModel {
    roleId: string;
    pagePermissionId: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

