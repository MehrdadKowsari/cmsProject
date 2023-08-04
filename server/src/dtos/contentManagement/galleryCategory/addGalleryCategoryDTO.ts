export interface AddGalleryCategoryDTO{
  parentId?: string;
  name: string;
  description: string;
  image: string | null;
  imageSavePath: string | null;
  priority: number;
  locale: string | null;
}

