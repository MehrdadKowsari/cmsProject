import { BaseModel } from "../../shared/base/baseModel";

export interface PagePermissionDTO extends BaseModel {
    pageId: string;
    pageName: string;
    permissionId: string;
    permissionName: string;
}


