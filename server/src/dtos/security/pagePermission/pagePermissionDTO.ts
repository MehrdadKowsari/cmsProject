import { PageTypeEnum } from "src/enums/security/pageEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";
import { PermissionTypeEnum } from "src/enums/security/permissionTypeEnum";

export interface PagePermissionDTO extends BaseModel {
    pageId: string;
    pageName: string;
    pageType: PageTypeEnum;
    permissionId: string;
    permissionName: string;
    permissionType: PermissionTypeEnum;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

