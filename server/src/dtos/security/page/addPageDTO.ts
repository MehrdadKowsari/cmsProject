export interface AddPageDTO{
  parentId?: string;
  name: string;
  type: PageTypeEnum;
  priority: number;
  iconClass?: string;
}

