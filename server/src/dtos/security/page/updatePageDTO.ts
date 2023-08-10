import { PageTypeEnum } from "src/enums/security/pageTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePageDTO extends BaseModel {
  parentId?: string;
  name: string;
  type: PageTypeEnum;
  priority: number;
  iconClass?: string;
  path: string | null;
}

