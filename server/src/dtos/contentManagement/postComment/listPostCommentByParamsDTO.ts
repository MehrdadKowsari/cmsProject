import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListPostCommentByParamsDTO{
    gridParameter: GridParameter;
    postId: string | number;
}