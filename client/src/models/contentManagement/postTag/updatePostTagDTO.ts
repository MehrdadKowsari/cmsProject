import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePostTagDTO extends BaseModel {
  postId: string;
  tagId: string;
}

