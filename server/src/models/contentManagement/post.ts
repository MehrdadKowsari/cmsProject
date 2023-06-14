import { Schema, model, Types } from 'mongoose';
import { PostStatusTypeEnum } from 'src/enums/contentManagement/postStatusTypeEnum';
import { PostTypeEnum } from 'src/enums/contentManagement/postTypeEnum';

export const DOCUMENT_NAME = 'Post';
export const COLLECTION_NAME = 'posts';

export  interface Post {
  _id: Types.ObjectId | null;
  postCategoryId: Types.ObjectId;
  title: string;
  shortDescription: string | null;
  content: string | null;
  type: PostTypeEnum;
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
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<Post>(
  {
    postCategoryId: {
      type: Schema.Types.ObjectId,
      ref:'PostCategory'
    },
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 1000
    },
    shortDescription: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    content: {
      type: Schema.Types.String
    },
    type: {
      type: Schema.Types.Number,
      required: true
    },
    image: {
      type: Schema.Types.String
    },
    thumbnailImage: {
      type: Schema.Types.String
    },
    videoUrl: {
      type: Schema.Types.String
    },
    videoPoster: {
      type: Schema.Types.String
    },
    thumbnailVideoPoster: {
      type: Schema.Types.String
    },
    visitNumber: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    raterNumber: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    totalRating: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    likeCount: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    dislikeCount: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    isCommentOpen: {
      type: Schema.Types.Boolean,
      required: true,
      default: true
    },
    slugUrl: {
      type: Schema.Types.String,
      maxlength: 2000
    },
    galleryId: {
      type: Schema.Types.ObjectId,
      ref:'Gallery'
    },
    priority: {
      type: Schema.Types.Number,
      required: true
    },
    isFeatured: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
    },
    dateFrom: {
      type: Schema.Types.Date
    },
    dateTo: {
      type: Schema.Types.Date
    },
    locale: {
      type: Schema.Types.String
    },
    status: {
      type: Schema.Types.Number,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      dafault: Date.now()
    },
    updatedAt: {
      type: Schema.Types.Date
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
  }
);

const PostModel = model<Post>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
