import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PostTagDTO extends BaseModel {
  postId: string;
  tagId: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}