import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListPostImageByParamsDTO{
    gridParameter: GridParameter;
    postId: string | number;
}