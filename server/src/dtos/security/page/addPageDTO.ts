import { PageTypeEnum } from "src/enums/security/pageTypeEnum";

export interface AddPageDTO{
  parentId?: string;
  name: string;
  type: PageTypeEnum;
  priority: number;
  iconClass?: string;
  path: string | null;
}

