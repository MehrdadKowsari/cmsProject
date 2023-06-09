import { SliderTypeEnum } from "src/enums/contentManagement/sliderTypeEnum";

export interface AddGalleryCategoryDTO{
  articleCategoryId?: string | null;
  galleryId?: string | null;
  name: string;
  description: string | null;
  type: SliderTypeEnum;
  params: string | null;
  sectionName: string | null;
  allowedFileExtension: string | null;
  priority: number | number;
  locale: string | null;
}

