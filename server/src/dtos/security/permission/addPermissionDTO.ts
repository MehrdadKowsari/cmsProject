import { PermissionTypeEnum } from "../../enums/security/permissionTypeEnum";

export interface AddPermissionDTO{
  name: string;
  type: PermissionTypeEnum;
  description?: string;
}

