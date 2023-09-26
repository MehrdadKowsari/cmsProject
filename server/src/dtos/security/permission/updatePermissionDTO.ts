import { PermissionTypeEnum } from "../../enums/security/permissionTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePermissionDTO extends BaseModel {
  name: string;
  type: PermissionTypeEnum;
  description?: string;
}

