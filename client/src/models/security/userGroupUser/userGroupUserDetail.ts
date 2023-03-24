import { BaseModel } from "../../shared/base/baseModel";

export class UserGroupUserDetail extends BaseModel {
    public UserGroupId: number;
    public UserGroupUserId: number;
    public UserGroupUserFullName: string;
}

