import { GridParameter } from "../../dtos/shared/grid/gridPrameter";

export interface ListRelatedPostByParams{
    gridParameter: GridParameter;
    postId: string;
}