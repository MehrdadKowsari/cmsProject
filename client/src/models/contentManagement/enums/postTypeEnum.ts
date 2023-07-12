export enum PostTypeEnum {
    Text = 1,
    Video = 2,
    Audio = 3,
    ImageGallery = 4,
    VideoGallery = 5,
    AudioGallery = 6
}

export const PostTypeEnumLabelMapping: Record<PostTypeEnum, string> ={
    [PostTypeEnum.Text]: 'text',
    [PostTypeEnum.Video]: 'video',
    [PostTypeEnum.Audio]: 'audio',
    [PostTypeEnum.ImageGallery]: 'imageGallery',
    [PostTypeEnum.VideoGallery]: 'videoGallery',
    [PostTypeEnum.AudioGallery]: 'audioGallery',
}