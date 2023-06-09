export interface AddGalleryFileDTO{
  galleryId: string;
  name: string | null;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  fileSize: number | null;
  downloadCount: number;
  priority: number | null;
}

