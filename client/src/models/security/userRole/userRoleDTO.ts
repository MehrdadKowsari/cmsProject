import { BaseModel } from "../../shared/base/baseModel";

export interface UserRoleDTO extends BaseModel {
    userId: string;
    userFullName: string;
    roleId: string;
    roleName: string;
}


