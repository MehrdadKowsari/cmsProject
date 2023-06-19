import { MenuItemType } from "../enums//menuItemTypeEnum";

export interface AddMenuItemDTO{
  menuId: string;
  parentId: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  level: number | null;
  url: string;
  slugUrl: string | null;
  target: string;
  rel: string | null;
  iconCssClass: string | null;
  iconSavePath: string | null;
  type: MenuItemType,
  priority: number | null;
}

