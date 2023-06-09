import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PostFileDTO extends BaseModel {
  postId: string;
  postTitle: string | null;
  name: string | null;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  fileSize: number | null;
  downloadCount: number;
  priority: number | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

