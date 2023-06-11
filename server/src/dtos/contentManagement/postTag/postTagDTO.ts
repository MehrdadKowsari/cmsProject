import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PostTagDTO extends BaseModel {
  postId: string;
  postTitle: string | null;
  tagId: string;
  tagName: string | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}