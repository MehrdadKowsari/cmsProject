import { PostStatusTypeEnum } from "src/enums/contentManagement/postStatusTypeEnum";
import { PostTypeEnum } from "src/enums/contentManagement/postTypeEnum";


export interface AddPostDTO{
  postCategoryId: string;
  title: string;
  shortDescription: string | null;
  content: string | null;
  type: PostTypeEnum;
  image: string | null;
  thumbnailImage: string | null;
  videoUrl: string | null;
  videoPoster: string | null;
  thumbnailVideoPoster: string | null;
  isCommentOpen: boolean;
  slugUrl: string;
  galleryId: number | string | null;
  priority: number | number;
  isFeatured: boolean;
  dateFrom: Date | null;
  dateTo: Date | null;
  status: PostStatusTypeEnum;
  locale: string | null;
}

