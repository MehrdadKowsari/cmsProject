import { BaseModel } from "../../models/shared/base/baseModel";

export interface PagePermissionDTO extends BaseModel {
    pageId: string;
    permissionId: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

