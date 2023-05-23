import { PermissionTypeEnum } from "src/enums/security/permissionTypeEnum";

export interface AddPermissionDTO{
  name: string;
  type: PermissionTypeEnum;
  description?: string;
}

