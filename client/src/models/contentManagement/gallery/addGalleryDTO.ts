import { GalleryTypeEnum } from "../enums//galleryTypeEnum";

export interface AddGalleryDTO{
  galleryCategoryId: string;
  name: string;
  description: string | null;
  params: string | null;
  type: GalleryTypeEnum;
  image?: string | null;
  thumbnailImage?: string | null;
  slugUrl: string | null;
  allowedFileExtension: string | null;
  priority: number | number;
  locale: string | null;
}

