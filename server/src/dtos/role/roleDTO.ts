import { BaseModel } from "../../models/shared/base/baseModel";

export interface RoleDTO extends BaseModel {
    name: string;
    description: string;
    isActive: boolean;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

