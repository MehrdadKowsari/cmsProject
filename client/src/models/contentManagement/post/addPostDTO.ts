import { PostStatusTypeEnum } from "../enums//postStatusTypeEnum";
import { PostTypeEnum } from "../enums//postTypeEnum";


export interface AddPostDTO{
  postCategoryId: string;
  title: string;
  shortDescription: string | null;
  content: string | null;
  type: PostTypeEnum;
  image: string | null;
  thumbnailImage?: string | null;
  videoUrl?: string | null;
  videoPoster?: string | null;
  thumbnailVideoPoster?: string | null;
  isCommentOpen?: boolean;
  slugUrl: string | null;
  galleryId?: number | string | null;
  priority: number | number;
  isFeatured?: boolean;
  dateFrom: Date | null;
  dateTo: Date | null;
  status: PostStatusTypeEnum;
  locale: string | null;
}

