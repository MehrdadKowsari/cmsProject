import { AgGridFilter } from "./agGridFilter";

export class AgGridParameter {
    public StartRow?: number;
    public EndRow?: number;
    public PageSize: number;
    public ColId?: string;
    public Sort?: string;
    public Filters: AgGridFilter[];
    public SearchTerm?: string;
}
