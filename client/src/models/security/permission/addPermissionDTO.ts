import { PermissionEnum } from "src/models/shared/enums/permissionEnum";

export interface AddPermissionDTO {
    name: string;
    type: PermissionEnum;
    description?: string;
}

