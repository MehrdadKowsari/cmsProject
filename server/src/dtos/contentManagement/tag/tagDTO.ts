import { BaseModel } from "src/models/shared/base/baseModel";

export interface RoleDTO extends BaseModel {
    name: string;
    isActive: boolean;
    locale: string | null;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}

