import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdatePostImageDTO extends BaseModel {
  postId: string | number;
  name: string;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  imageExtension: string | null;
  imageSize?: number | null;
  priority: number | null;
}

