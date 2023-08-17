import { BaseModel } from "../../../models/shared/base/baseModel";
import { ConfirmStatusTypeEnum } from "../enums/confirmStatusTypeEnum";

export interface UpdatePostCommentDTO extends BaseModel {
  parentId?: string | null;
  postId: string | number;
  title: string | null;
  comment: string;
  fullName: string | null;
  email: string | null;
  website: string | null;
  ip: string | null;
  priority: number | null;
  status: ConfirmStatusTypeEnum;
}

