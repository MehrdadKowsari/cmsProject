import { UserType } from "../security/user";
import { Language } from "../shared/language";

export {}

declare global {
  namespace Express {
    export interface Request {
      language?: Language;
      user?: UserType;
    }
  }
}