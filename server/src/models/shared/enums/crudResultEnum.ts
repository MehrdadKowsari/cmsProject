export enum CRUDResultEnum {
  Success = 1,
  SuccessWithNotification = 2,
  SuccessWithWarning = 3,
  Error = 4,
  UnknownError = 5,
  ModelIsInvalid = 6,
  AccessDenied = 7
}

export const CRUDResultEnumLabelMapping: Record<CRUDResultEnum, string> = {
  [CRUDResultEnum.Success]: "Success",
  [CRUDResultEnum.SuccessWithNotification]: "Success With Notification",
  [CRUDResultEnum.SuccessWithWarning]: "Success With Warning",
  [CRUDResultEnum.Error]: "Error",
  [CRUDResultEnum.UnknownError]: "Unknown Error",
  [CRUDResultEnum.ModelIsInvalid]: "Model Is Invalid",
  [CRUDResultEnum.AccessDenied]: "Access Denied"
}
