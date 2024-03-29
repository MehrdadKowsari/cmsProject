import { PageTypeEnum } from "../enums/pageTypeEnum";

export interface AddPageDTO {
    parentId?: string | null;
    name: string;
    type: PageTypeEnum;
    iconClass?: string | null;
    path: string | null;
    priority: number;
}




