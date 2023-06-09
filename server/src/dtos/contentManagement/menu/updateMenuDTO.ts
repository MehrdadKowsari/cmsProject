import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateMenuDTO extends BaseModel {
  name: string;
  description: string | null;
  sectionName: string;
  priority: number | null;
  locale: string | null;
}

