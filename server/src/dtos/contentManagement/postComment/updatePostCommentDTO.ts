import { ConfirmStatusTypeEnum } from "../../enums/shared/confirmStatusTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePostCommentDTO extends BaseModel {
  parentId?: string | null;
  postId: string;
  title: string | null;
  comment: string;
  fullName: string | null;
  email: string | null;
  website: string | null;
  ip: string | null;
  priority: number | null;
  status: ConfirmStatusTypeEnum;
}

