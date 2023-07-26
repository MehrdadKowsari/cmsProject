import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateContentBlockDTO extends BaseModel {
  title: string;
  content: string | null;
  sectionName: string | null;
  iconCssClass: string | null;
  image: string | null;
  thumbnailImage?: string | null;
  priority: number | number;
  dateFrom: Date | null;
  dateTo: Date | null;
  locale: string | null;
}

