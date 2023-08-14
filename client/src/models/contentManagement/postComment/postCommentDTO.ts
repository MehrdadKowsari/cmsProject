import { BaseModel } from "../../../models/shared/base/baseModel";
import { ConfirmStatusTypeEnum } from "../enums/confirmStatusTypeEnum";

export interface PostCommentDTO extends BaseModel {
  parentId?: string | null;
  postId: string;
  postTitle: string | null;
  title: string | null;
  comment: string | null;
  fullName: string | null;
  email: string | null;
  website: string | null;
  ip: string | null;
  likeCount: number;
  dislikeCount: number;
  priority: number | null;
  status: ConfirmStatusTypeEnum;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}