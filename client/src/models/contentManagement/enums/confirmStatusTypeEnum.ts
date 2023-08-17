export enum ConfirmStatusTypeEnum {
    Pending = 1,
    Accepted = 2,
    Rejected = 3
}

export const ConfirmStatusTypeEnumLabelMapping: Record<ConfirmStatusTypeEnum, string> = {
    [ConfirmStatusTypeEnum.Pending]: 'pending',
    [ConfirmStatusTypeEnum.Accepted]: 'accepted',
    [ConfirmStatusTypeEnum.Rejected]: 'rejected',

}