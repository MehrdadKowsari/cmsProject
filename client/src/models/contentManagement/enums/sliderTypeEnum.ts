export enum SliderTypeEnum {
    Slider = 1,
    Carousel = 2
}
export const SliderTypeEnumLabelMapping: Record<SliderTypeEnum, string> = {
    [SliderTypeEnum.Slider]: 'slider',
    [SliderTypeEnum.Carousel]: 'caroucel'
}