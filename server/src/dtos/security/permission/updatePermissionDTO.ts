import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePermissionDTO extends BaseModel {
  name: string;
  description?: string;
}

