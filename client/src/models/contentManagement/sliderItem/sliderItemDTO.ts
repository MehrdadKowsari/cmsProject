import { BaseModel } from "../../../models/shared/base/baseModel";

export interface SliderItemDTO extends BaseModel {
  sliderId: string;
  sliderSectionName: string | null;
  name: string;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  linkUrl: string | null;
  linkTarget: string | null;
  priority: number | null;
  isActive: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

