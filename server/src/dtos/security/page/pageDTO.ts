import { PageTypeEnum } from "src/enums/security/pageEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PageDTO extends BaseModel {
    parentId?: string;
    parentName: string;
    name: string;
    type: PageTypeEnum,
    priority: number;
    iconClass?: string;
    isActive: boolean;
    isHidden: boolean;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

