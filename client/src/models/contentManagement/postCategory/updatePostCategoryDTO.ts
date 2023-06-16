import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePostCategoryDTO extends BaseModel {
  parentId?: string;
  name: string;
  description: string;
  priority: number;
  locale: string | null;
}

