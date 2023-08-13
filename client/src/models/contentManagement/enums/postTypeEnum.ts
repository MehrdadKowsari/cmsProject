export enum PostTypeEnum {
    Text = 1,
    Page = 2,
    Video = 3,
    Audio = 4,
    ImageGallery = 5,
    VideoGallery = 6,
    AudioGallery = 7
}

export const PostTypeEnumLabelMapping: Record<PostTypeEnum, string> ={
    [PostTypeEnum.Text]: 'text',
    [PostTypeEnum.Page]: 'page',
    [PostTypeEnum.Video]: 'video',
    [PostTypeEnum.Audio]: 'audio',
    [PostTypeEnum.ImageGallery]: 'imageGallery',
    [PostTypeEnum.VideoGallery]: 'videoGallery',
    [PostTypeEnum.AudioGallery]: 'audioGallery',
}