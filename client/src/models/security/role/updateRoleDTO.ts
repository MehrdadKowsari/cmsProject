import { BaseModel } from "../../shared/base/baseModel";

export class UpdateRoleDTO extends BaseModel {
    name: string;
    description?: string;
}

