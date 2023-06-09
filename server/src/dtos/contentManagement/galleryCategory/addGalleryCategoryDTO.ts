export interface AddGalleryCategoryDTO{
  parentId?: string;
  name: string;
  description: string;
  priority: number;
  locale: string | null;
}

