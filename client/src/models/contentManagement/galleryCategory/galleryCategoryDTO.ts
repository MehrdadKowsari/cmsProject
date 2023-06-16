import { BaseModel } from "../../../models/shared/base/baseModel";

export interface GalleryCategoryDTO extends BaseModel {
    parentId?: string;
    parentName: string;
    name: string;
    description: string;
    priority: number;
    isActive: boolean;
    locale: string | null;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

