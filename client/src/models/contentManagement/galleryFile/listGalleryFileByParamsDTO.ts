import { GridParameter } from "src/models/shared/grid/gridPrameter";

export interface ListGalleryFileByParamsDTO{
    gridParameter: GridParameter;
    galleryId: string | number;
}