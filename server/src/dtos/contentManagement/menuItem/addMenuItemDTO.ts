import { MenuItemTypeEnum } from "src/enums/contentManagement/menuItemTypeEnum";

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
  type: MenuItemTypeEnum,
  priority: number | null;
}

