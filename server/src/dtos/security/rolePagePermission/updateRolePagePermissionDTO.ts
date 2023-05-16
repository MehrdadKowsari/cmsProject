import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateRolePagePermissionDTO extends BaseModel {
  roleId: string;
  pagePermissionId: string;
}

