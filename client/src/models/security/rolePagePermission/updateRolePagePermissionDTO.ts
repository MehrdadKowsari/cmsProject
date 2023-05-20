import { BaseModel } from "../../shared/base/baseModel";

export class UpdateRolePagePermissionDTO extends BaseModel {
    roleId: string;
    pagePermissionId: string;
}

