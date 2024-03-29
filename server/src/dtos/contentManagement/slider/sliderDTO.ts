import { SliderTypeEnum } from "../../enums/contentManagement/sliderTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface SliderDTO extends BaseModel {
    articleCategoryId?: string | null;
    articleCategoryName?: string | null;
    galleryId?: string | null;
    galleryName?: string | null;
    name: string;
    description: string;
    type: SliderTypeEnum;
    typeName: string;
    params: string;
    sectionName: string;
    allowedFileExtension: string;
    priority: number;
    isActive: boolean;
    locale: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

