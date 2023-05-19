import { BaseModel } from "../../shared/base/baseModel";

export interface RolePagePermissionDTO extends BaseModel {
    roleId: string;
    roleName: string;
    pagePermissionId: string;
    pagePermissionName: string;
}


