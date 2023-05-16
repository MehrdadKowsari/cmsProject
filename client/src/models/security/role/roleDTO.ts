import { BaseModel } from "../../shared/base/baseModel";

export interface RoleDTO extends BaseModel {
    name: string;
    description?: string;
}


