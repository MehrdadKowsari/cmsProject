import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateRelatedPostDTO extends BaseModel {
  postId: string;
  relatedPostId: string;
}

