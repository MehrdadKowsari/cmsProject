import { BaseModel } from "../../../models/shared/base/baseModel";

export interface PermissionDTO extends BaseModel {
    name: string;
    type: PermissionType;
    description: string;
    isActive: boolean;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

