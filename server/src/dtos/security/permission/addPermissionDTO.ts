import { PermissionEnum } from "src/enums/security/permissionType";

export interface AddPermissionDTO{
  name: string;
  type: PermissionEnum;
  description?: string;
}

