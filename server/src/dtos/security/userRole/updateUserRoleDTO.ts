import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateUserRoleDTO extends BaseModel {
  userId: string;
  roleId: string;
}

