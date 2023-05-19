import { BaseModel } from "src/models/shared/base/baseModel";

export interface UpdatePageDTO extends BaseModel {
    parentId?: string | null;
    name: string;
    iconClass?: string | null;
    priority: number;
}




