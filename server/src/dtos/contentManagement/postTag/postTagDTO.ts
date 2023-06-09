import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PostTagDTO extends BaseModel {
  postId: string;
  postTitle: string | null;
  tagId: string;
  tagTitle: string | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}