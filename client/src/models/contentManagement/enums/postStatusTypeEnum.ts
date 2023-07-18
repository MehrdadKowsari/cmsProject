export enum PostStatusTypeEnum {
    Draft = 1,
    Preview = 2,
    Pending = 3,
    Published = 4,
    Future = 5,
    Hidden = 6,
    Trash = 7
}

export const PostStatusTypeEnumLabelMapping: Record<PostStatusTypeEnum, string> = {
    [PostStatusTypeEnum.Draft]: 'draft',
    [PostStatusTypeEnum.Preview]: 'preview',
    [PostStatusTypeEnum.Pending]: 'pending',
    [PostStatusTypeEnum.Published]: 'published',
    [PostStatusTypeEnum.Future]: 'future',
    [PostStatusTypeEnum.Hidden]: 'hidden',
    [PostStatusTypeEnum.Trash]: 'trash'
}