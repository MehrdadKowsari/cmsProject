import { PostTypeEnum } from "src/enums/contentManagement/postTypeEnum";
import { BaseModel } from "../../../models/shared/base/baseModel";
import { PostStatusTypeEnum } from "src/enums/contentManagement/postStatusTypeEnum";

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
  locale: string | null;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

