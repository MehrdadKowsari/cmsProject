import { BaseModel } from "src/models/shared/base/baseModel";
import { PageTypeEnum } from "../enums/pageTypeEnum";

export interface PageDTO extends BaseModel {
    parentId?: string;
    parentName?: string;
    name: string;
    type: PageTypeEnum;
    priority: number;
    isActive: boolean;
    isHidden: boolean;
    iconClass?: string;
    path: string | null;
    children: PageDTO[];
}




