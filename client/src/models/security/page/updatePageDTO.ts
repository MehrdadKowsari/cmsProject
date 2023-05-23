import { BaseModel } from "src/models/shared/base/baseModel";
import { PageTypeEnum } from "../enums/pageTypeEnum";

export interface UpdatePageDTO extends BaseModel {
    parentId?: string | null;
    name: string;
    type: PageTypeEnum;
    iconClass?: string | null;
    priority: number;
}




