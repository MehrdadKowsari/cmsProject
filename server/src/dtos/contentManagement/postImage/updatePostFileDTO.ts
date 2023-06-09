import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePostImageDTO extends BaseModel {
  postId: string;
  name: string;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  priority: number | null;
}

