import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";
import { BaseModel } from "../../shared/base/baseModel";

export interface PagePermissionDTO extends BaseModel {
    pageId: string;
    pageName: string;
    permissionId: string;
    permissionType: PermissionTypeEnum;
    permissionName: string;
}


