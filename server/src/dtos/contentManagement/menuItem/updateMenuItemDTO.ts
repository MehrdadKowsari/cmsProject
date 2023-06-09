import { MenuItemType } from "src/enums/contentManagement/menuItemTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface UpdateMenuItemDTO extends BaseModel {
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

