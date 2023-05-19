import { BaseModel } from "../../shared/base/baseModel";

export class UpdatePagePermissionDTO extends BaseModel {
    pageId: string;
    permissionId: string;
}

