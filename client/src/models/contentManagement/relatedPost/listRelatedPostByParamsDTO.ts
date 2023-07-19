import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListRelatedPostByParamsDTO{
    gridParameter: GridParameter;
    postId: string | number;
}