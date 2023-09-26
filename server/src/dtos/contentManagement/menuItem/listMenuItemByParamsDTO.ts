import { GridParameter } from "../../dtos/shared/grid/gridPrameter";

export interface ListMenuItemByParamsDTO{
    gridParameter: GridParameter;
    menuId: string | number;
}