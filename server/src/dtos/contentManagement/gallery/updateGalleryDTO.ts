import { BaseModel } from "../../../models/shared/base/baseModel";
import { GalleryTypeEnum } from "../../enums/contentManagement/galleryTypeEnum";

export interface UpdateGalleryDTO extends BaseModel {
  galleryCategoryId: string;
  name: string;
  description: string | null;
  params: string | null;
  type: GalleryTypeEnum;
  image: string | null;
  thumbnailImage: string | null;
  slugUrl: string | null;
  allowedFileExtension: string | null;
  priority: number | number;
  locale: string | null;
}

