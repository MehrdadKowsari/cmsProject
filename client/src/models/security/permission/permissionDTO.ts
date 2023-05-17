import { PermissionEnum } from "src/models/shared/enums/permissionEnum";
import { BaseModel } from "../../shared/base/baseModel";

export interface PermissionDTO extends BaseModel {
    name: string;
    type: PermissionEnum;
    description?: string;
}


