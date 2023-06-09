import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateMenuDTO extends BaseModel {
  name: string | null;
  description: string | null;
  sectionName: string;
  priority: number | null;
  isActive: boolean;
  locale: string | null;
}

