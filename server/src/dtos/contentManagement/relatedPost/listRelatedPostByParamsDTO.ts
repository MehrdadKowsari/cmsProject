import { GridParameter } from "src/dtos/shared/grid/gridPrameter";

export interface ListRelatedPostByParams{
    gridParameter: GridParameter;
    postId: string;
}