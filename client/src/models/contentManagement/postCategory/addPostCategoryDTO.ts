export interface AddPostCategoryDTO{
  parentId?: string;
  name: string;
  description: string;
  priority: number;
  locale: string | null;
}

