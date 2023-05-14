import { BaseModel } from "../../models/shared/base/baseModel";

export interface UpdateRoleDTO extends BaseModel {
  name: string;
  description?: string;
}

