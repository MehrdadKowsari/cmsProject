import { BaseModel } from "src/models/shared/base/baseModel";

export class Page extends BaseModel {
    public ParentId: number;
    public Parent: Page;
    public PageName: string;
    public PageSource: string;
    public PageIndex: number;
    public SubSystemId: number;
    public SubSystem: number;
    public DllName: string;
    public ProcName: string;
    public Visibility: number;
    public Type: number;
    public SecondarySubSystemId: number;
    public SecondarySubSystem: number;
    public IconClass: string;
    public Children: Page[];
}




