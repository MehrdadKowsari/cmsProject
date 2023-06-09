import { BaseModel } from "../../../models/shared/base/baseModel";
import { GalleryTypeEnum } from "src/enums/contentManagement/galleryTypeEnum";

export interface GalleryDTO extends BaseModel {
    galleryCategoryId: string;
    galleryCategoryName: string;
    name: string;
    description: string | null;
    params: string | null;
    type: GalleryTypeEnum;
    typeName: string;
    image: string | null;
    thumbnailImage: string | null;
    slugUrl: string | null;
    allowedFileExtension: string | null;
    priority: number | number;
    isActive: boolean;
    locale: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

