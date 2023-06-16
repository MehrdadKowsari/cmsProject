import { BaseModel } from "../../../models/shared/base/baseModel";

export interface RelatedPostDTO extends BaseModel {
  postId: string;
  postTitle: string | null;
  relatedPostId: string;
  relatedPostTitle: string | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}