import { Schema, model, Types } from 'mongoose';
import { GalleryTypeEnum } from 'src/enums/contentManagement/galleryTypeEnum';
import { GalleryFile } from './galleryFile';

export const DOCUMENT_NAME = 'Gallery';
export const COLLECTION_NAME = 'galleries';

export  interface Gallery {
  _id: Types.ObjectId | null;
  galleryCategoryId?: Types.ObjectId;
  name: string;
  description: string | null;
  params: string | null;
  type: GalleryTypeEnum;
  image: string | null;
  thumbnailImage: string | null;
  visitNumber: number;
  likeCount: number;
  dislikeCount: number;
  slugUrl: string | null;
  allowedFileExtension: string | null;
  priority: number | number;
  isActive: boolean;
  locale: string | null;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  galleryFiles?: GalleryFile[] | null;
}

const schema = new Schema<Gallery>(
  {
    galleryCategoryId: {
      type: Schema.Types.ObjectId,
      ref:'GalleryCategory'
    },
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 2000
    },
    description: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    params: {
      type: Schema.Types.String
    },
    image: {
      type: Schema.Types.String
    },
    thumbnailImage: {
      type: Schema.Types.String
    },
    visitNumber: {
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
    slugUrl: {
      type: Schema.Types.String,
      maxlength: 2000
    },
    allowedFileExtension: {
      type: Schema.Types.String,
      maxlength: 200
    },
    priority: {
      type: Schema.Types.Number,
      required: true
    },
    isActive: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
    },
    locale: {
      type: Schema.Types.String
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

const GalleryModel = model<Gallery>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default GalleryModel;
