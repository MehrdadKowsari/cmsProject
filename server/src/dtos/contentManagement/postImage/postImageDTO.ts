import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PostImageDTO extends BaseModel {
  postId: string;
  postTitle: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  imageExtension: string | null;
  imageSize: number | null;
  downloadCount: number;
  priority: number | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

