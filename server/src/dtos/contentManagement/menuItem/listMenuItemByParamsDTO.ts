import { GridParameter } from "src/dtos/shared/grid/gridPrameter";

export interface ListMenuItemByParamsDTO{
    gridParameter: GridParameter;
    menuId: string | number;
}