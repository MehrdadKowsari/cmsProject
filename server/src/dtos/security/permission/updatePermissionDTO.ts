import { PermissionEnum } from "src/enums/security/permissionType";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePermissionDTO extends BaseModel {
  name: string;
  type: PermissionEnum;
  description?: string;
}

