import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";
import { BaseModel } from "../../shared/base/baseModel";

export class UpdatePermissionDTO extends BaseModel {
    name: string;
    type: PermissionTypeEnum;
    description?: string;
}

