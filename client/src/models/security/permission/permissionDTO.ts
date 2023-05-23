import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";
import { BaseModel } from "../../shared/base/baseModel";

export interface PermissionDTO extends BaseModel {
    name: string;
    type: PermissionTypeEnum;
    description?: string;
}


