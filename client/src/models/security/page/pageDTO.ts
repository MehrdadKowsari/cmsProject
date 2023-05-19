import { BaseModel } from "src/models/shared/base/baseModel";

export interface PageDTO extends BaseModel {
    parentId?: string;
    parentName?: string;
    name: string;
    priority: number;
    isActive: boolean;
    isHidden: boolean;
    iconClass?: string;
    children: PageDTO[];
}




