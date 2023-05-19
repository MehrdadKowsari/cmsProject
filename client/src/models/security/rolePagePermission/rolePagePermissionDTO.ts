import { BaseModel } from "../../shared/base/baseModel";

export interface PagePermissionDTO extends BaseModel {
    roleId: string;
    roleName: string;
    pagePermissionId: string;
    pagePermissionName: string;
}


