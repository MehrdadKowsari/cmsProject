import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateGalleryCategoryDTO extends BaseModel {
  parentId?: string | null;
  name: string;
  description: string | null;
  priority: number;
  locale: string | null;
}

