import { MenuItemTypeEnum } from "../enums//menuItemTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";

export interface MenuItemDTO extends BaseModel {
  menuId: string;
  menuName: string | null;
  parentId: string | null;
  parentName: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  level: number | null;
  url: string;
  slugUrl: string | null;
  target: string;
  iconCssClass: string | null;
  iconSavePath: string | null;
  type: MenuItemTypeEnum,
  isActive: boolean,
  priority: number | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

