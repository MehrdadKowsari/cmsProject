import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListMenuItemByParamsDTO{
    gridParameter: GridParameter;
    menuId: string | number;
}