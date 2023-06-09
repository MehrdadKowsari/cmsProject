import { ConfirmStatusTypeEnum } from "src/enums/shared/confirmStatusTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePostCommentDTO extends BaseModel {
  parentId?: string | null;
  postId: string;
  title: string | null;
  comment: string | null;
  fullName: string | null;
  email: string | null;
  website: string | null;
  ip: string | null;
  priority: number | null;
  status: ConfirmStatusTypeEnum;
}

