import { BaseModel } from "../../shared/base/baseModel";

export class UpdateUserRoleDTO extends BaseModel {
    userId: string;
    roleId?: string;
}

