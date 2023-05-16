import { BaseModel } from "../../models/shared/base/baseModel";

export interface UpdatePageDTO extends BaseModel {
  parentId?: string;
  name: string;
  priority: number;
  iconClass?: string;
}

