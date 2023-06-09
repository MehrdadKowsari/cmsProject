import { BaseModel } from "../../../models/shared/base/baseModel";

export interface GalleryCategoryDTO extends BaseModel {
    name: string;
    description: string | null;
    sectionName: string;
    priority: number | null;
    isActive: boolean;
    locale: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

