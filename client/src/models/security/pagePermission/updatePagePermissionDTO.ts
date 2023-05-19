import { BaseModel } from "../../shared/base/baseModel";

export class UpdatePagePermissionDTO extends BaseModel {
    userId: string;
    roleId: string;
}

