import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePostCategoryDTO extends BaseModel {
  parentId: string | null;
  name: string;
  description: string | null;
  priority: number;
  locale?: string | null;
}

