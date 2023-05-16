import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePagePermissionDTO extends BaseModel {
  pageId: string;
  permissionId: string;
}

