export interface AddGalleryCategoryDTO{
  parentId?: string | null;
  name: string;
  description: string | null;
  image?: string | null;
  thumbnailImage?: string | null;
  priority: number;
  locale: string | null;
}

