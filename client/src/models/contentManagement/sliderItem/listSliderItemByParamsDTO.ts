import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListSliderItemByParamsDTO{
    gridParameter: GridParameter;
    sliderId: string | number;
}