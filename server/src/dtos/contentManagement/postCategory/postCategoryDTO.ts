import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PostCategoryDTO extends BaseModel {
    parentId?: string;
    parentName: string;
    name: string;
    description: string;
    priority: number;
    isActive: boolean;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

