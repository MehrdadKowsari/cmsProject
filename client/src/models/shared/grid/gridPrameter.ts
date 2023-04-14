import { GridSortModel } from "@mui/x-data-grid";
import { GridFilter } from "./gridFilter";

export interface GridParameter {
    currentPage?: number;
    pageSize: number;
    sortModel: GridSortModel,
    colId?: string;
    sort?: string;
    filters?: GridFilter[];
    searchTerm?: string;
}
