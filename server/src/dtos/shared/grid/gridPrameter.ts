import { GridFilter } from "./gridFilter";

export interface GridParameter {
    currentPage?: number;
    pageSize: number;
    sortModel: any,
    colId?: string;
    sort?: string;
    filters?: GridFilter[];
    searchTerm?: string;
}
