import { BaseModel } from "../../models/shared/base/baseModel";

export interface PermissionDTO extends BaseModel {
    name: string;
    description: string;
    isActive: boolean;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}
