import { PageTypeEnum } from "../../enums/security/pageTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";
import { PermissionTypeEnum } from "../../enums/security/permissionTypeEnum";

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

