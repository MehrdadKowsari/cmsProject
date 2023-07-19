import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateRelatedPostDTO extends BaseModel {
  postId: string | number;
  relatedPostId: string;
}

