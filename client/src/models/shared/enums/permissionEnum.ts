import CommonMessage from "src/constants/commonMessage";
export enum PermissionEnum {
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

export const PermissionEnumLabelMapping: Record<PermissionEnum, string> = {
    [PermissionEnum.View]: 'view',
    [PermissionEnum.Add]: 'add',
    [PermissionEnum.Update]: 'update',
    [PermissionEnum.Delete]: 'delete',
    [PermissionEnum.ToggleActive]: 'toggleActive',
    [PermissionEnum.Publish]: 'publish',
    [PermissionEnum.Unpublish]: 'unpublish',
    [PermissionEnum.Confirm]: 'confirm',
    [PermissionEnum.Reject]: 'reject',
    [PermissionEnum.Export]: 'export',
    [PermissionEnum.Import]: 'import',
    [PermissionEnum.Print]: 'print',
    [PermissionEnum.ViewComment]: 'viewComment',
    [PermissionEnum.AddComment]: 'addComment',
    [PermissionEnum.ReplyComment]: 'replyComment'
}