import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateGalleryFileDTO extends BaseModel {
  galleryId: string;
  name: string | null;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  fileSize: number | null;
  priority: number | null;
}

