import { BaseModel } from "../../shared/base/baseModel";

export interface UpdateUserProfileDTO extends BaseModel {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  userName: string;
}

