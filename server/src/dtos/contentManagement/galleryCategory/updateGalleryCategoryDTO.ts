import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateGalleryCategoryDTO extends BaseModel {
  parentId?: string;
  name: string;
  description: string;
  priority: number;
}

