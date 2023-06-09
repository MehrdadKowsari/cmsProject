import { BaseModel } from "../../../models/shared/base/baseModel";

export interface GalleryFileDTO extends BaseModel {
  galleryId: string;
  galleryName: string;
  name: string;
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

