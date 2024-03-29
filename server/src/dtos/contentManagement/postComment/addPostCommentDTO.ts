import { ConfirmStatusTypeEnum } from "../../enums/shared/confirmStatusTypeEnum";

export interface AddPostCommentDTO{
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

