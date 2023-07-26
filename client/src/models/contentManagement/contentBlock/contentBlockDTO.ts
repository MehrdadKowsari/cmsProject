import { BaseModel } from "../../../models/shared/base/baseModel";

export interface ContentBlockDTO extends BaseModel {
  title: string;
  content: string | null;
  sectionName: string | null;
  iconCssClass: string | null;
  image: string | null;
  thumbnailImage: string | null;
  priority: number | number;
  isActive: boolean;
  dateFrom: Date | null;
  dateTo: Date | null;
  locale: string | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

