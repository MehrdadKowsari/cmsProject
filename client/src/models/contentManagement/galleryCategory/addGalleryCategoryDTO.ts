export interface AddGalleryCategoryDTO{
  parentId?: string | null;
  name: string;
  description: string | null;
  priority: number;
  locale: string | null;
}

