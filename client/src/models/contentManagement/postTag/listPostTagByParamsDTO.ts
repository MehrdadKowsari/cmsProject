import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListPostTagByParamsDTO{
    gridParameter: GridParameter;
    postId: string | number;
}