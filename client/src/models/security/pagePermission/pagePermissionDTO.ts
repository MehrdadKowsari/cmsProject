import { BaseModel } from "../../shared/base/baseModel";

export interface UserRoleDTO extends BaseModel {
    pageId: string;
    pageName: string;
    PermissionId: string;
    PermissionName: string;
}


