import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateGalleryCategoryDTO extends BaseModel {
  parentId?: string;
  name: string;
  description: string;
  image: string | null;
  imageSavePath: string | null;
  priority: number;
  locale: string | null;
}

