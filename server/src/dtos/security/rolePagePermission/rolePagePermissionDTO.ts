import { BaseModel } from "../../../models/shared/base/baseModel";

export interface RolePagePermissionDTO extends BaseModel {
    roleId: string;
    roleName: string;
    pagePermissionId: string;
    pagePermissionName: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

