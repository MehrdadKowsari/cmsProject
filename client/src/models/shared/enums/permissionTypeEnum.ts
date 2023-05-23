import CommonMessage from "src/constants/commonMessage";
export enum PermissionTypeEnum {
    View = 1,
    Add = 2,
    Update = 3,
    Delete = 4,
    ToggleActive = 5,
    Publish = 6,
    Unpublish = 7,
    Confirm = 8,
    Reject = 9,
    Export = 10,
    Import = 11,
    Print = 12,
    ViewComment = 13,
    AddComment = 14,
    ReplyComment = 15
}

export const PermissionTypeEnumLabelMapping: Record<PermissionTypeEnum, string> = {
    [PermissionTypeEnum.View]: 'view',
    [PermissionTypeEnum.Add]: 'add',
    [PermissionTypeEnum.Update]: 'update',
    [PermissionTypeEnum.Delete]: 'delete',
    [PermissionTypeEnum.ToggleActive]: 'toggleActive',
    [PermissionTypeEnum.Publish]: 'publish',
    [PermissionTypeEnum.Unpublish]: 'unpublish',
    [PermissionTypeEnum.Confirm]: 'confirm',
    [PermissionTypeEnum.Reject]: 'reject',
    [PermissionTypeEnum.Export]: 'export',
    [PermissionTypeEnum.Import]: 'import',
    [PermissionTypeEnum.Print]: 'print',
    [PermissionTypeEnum.ViewComment]: 'viewComment',
    [PermissionTypeEnum.AddComment]: 'addComment',
    [PermissionTypeEnum.ReplyComment]: 'replyComment'
}