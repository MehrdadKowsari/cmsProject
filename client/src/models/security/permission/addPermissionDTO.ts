import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";

export interface AddPermissionDTO {
    name: string;
    type: PermissionTypeEnum;
    description?: string;
}

