import { BaseModel } from "src/models/shared/base/baseModel";

export interface UpdateTagDTO extends BaseModel {
  name: string;
  locale: string | null;
}

