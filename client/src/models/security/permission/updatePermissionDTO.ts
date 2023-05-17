import { PermissionEnum } from "src/models/shared/enums/permissionEnum";
import { BaseModel } from "../../shared/base/baseModel";

export class UpdatePermissionDTO extends BaseModel {
    name: string;
    type: PermissionEnum;
    description?: string;
}

