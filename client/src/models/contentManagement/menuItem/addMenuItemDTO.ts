import { MenuItemType } from "../enums//menuItemTypeEnum";

export interface AddMenuItemDTO{
  menuId: string | number;
  parentId: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  imageSavePath?: string | null;
  level?: number | null;
  url: string | null;
  slugUrl?: string | null;
  target: string | null;
  rel?: string | null;
  iconCssClass: string | null;
  iconSavePath?: string | null;
  type: MenuItemType,
  priority: number | null;
}

