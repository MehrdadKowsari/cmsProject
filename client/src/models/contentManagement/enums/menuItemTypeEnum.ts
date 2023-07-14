export enum MenuItemTypeEnum {
    Url = 1,
    Page = 2,
    Product = 3,
    Post = 4,
    Gallery = 5,
    ProductCategory = 6,
    PostCategory = 7,
    GalleryCategory = 8
}

export const MenuItemTypeEnumLabelMapping: Record<MenuItemTypeEnum, string> = {
   [MenuItemTypeEnum.Url]: 'url',
   [MenuItemTypeEnum.Page]: 'page',
   [MenuItemTypeEnum.Product]: 'product',
   [MenuItemTypeEnum.Post]: 'post',
   [MenuItemTypeEnum.Gallery]: 'gallery',
   [MenuItemTypeEnum.ProductCategory]: 'productCategory',
   [MenuItemTypeEnum.PostCategory]: 'postCategory',
   [MenuItemTypeEnum.GalleryCategory]: 'galleryCategory'
}