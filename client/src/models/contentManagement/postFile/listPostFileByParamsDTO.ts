import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListPostFileByParamsDTO{
    gridParameter: GridParameter;
    postId: string | number;
}