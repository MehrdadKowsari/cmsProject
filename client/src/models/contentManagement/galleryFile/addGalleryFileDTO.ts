export interface AddGalleryFileDTO{
  galleryId: string | number;
  name: string;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  fileSize?: number | null;
  priority: number | null;
}

