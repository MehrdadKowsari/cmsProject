export enum GalleryTypeEnum {
    Image = 1,
    Video = 2,
    Audio = 3
}

export const GalleryTypeEnumLabelMapping: Record<GalleryTypeEnum, string> = {
    [GalleryTypeEnum.Image]: 'image',
    [GalleryTypeEnum.Video]: 'video',
    [GalleryTypeEnum.Audio]: 'audio',

}