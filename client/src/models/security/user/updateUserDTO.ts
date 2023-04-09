import { BaseModel } from "../../shared/base/baseModel";

export interface UpdateUserDTO extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  userName: string;
}

