import { PostTypeEnum } from "../../enums/contentManagement/postTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";
import { PostStatusTypeEnum } from "../../enums/contentManagement/postStatusTypeEnum";
import { TagDTO } from "../tag/tagDTO";

export interface PostDTO extends BaseModel {
  postCategoryId: string;
  postCategoryName: string;
  title: string;
  shortDescription: string | null;
  content: string | null;
  type: PostTypeEnum;
  typeName: string;
  image: string | null;
  thumbnailImage: string | null;
  videoUrl: string | null;
  videoPoster: string | null;
  thumbnailVideoPoster: string | null;
  visitNumber: number;
  raterNumber: number;
  totalRating: number;
  likeCount: number;
  dislikeCount: number;
  isCommentOpen: boolean;
  slugUrl: string;
  galleryId: number | string | null;
  priority: number | number;
  isFeatured: boolean;
  dateFrom: Date | null;
  dateTo: Date | null;
  status: PostStatusTypeEnum;
  postTags: TagDTO[],
  relatedPosts: PostDTO[],
  locale: string | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

