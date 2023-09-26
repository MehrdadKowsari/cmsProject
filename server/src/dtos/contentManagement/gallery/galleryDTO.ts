import { BaseModel } from "../../../models/shared/base/baseModel";
import { GalleryTypeEnum } from "../../enums/contentManagement/galleryTypeEnum";

export interface GalleryDTO extends BaseModel {
    galleryCategoryId: string;
    galleryCategoryName: string;
    name: string;
    description: string | null;
    params: string | null;
    type: GalleryTypeEnum;
    typeName: string | null;
    image: string | null;
    thumbnailImage: string | null;
    slugUrl: string | null;
    allowedFileExtension: string | null;
    visitNumber: number;
    likeCount: number;
    dislikeCount: number;
    priority: number | number;
    isActive: boolean;
    locale: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

