import { Schema, model, Types } from 'mongoose';
import { GalleryTypeEnum } from '../../enums/contentManagement/galleryTypeEnum';
import { GalleryFile } from './galleryFile';

export const DOCUMENT_NAME = 'Gallery';
export const COLLECTION_NAME = 'galleries';

export  interface Gallery {
  _id: Types.ObjectId | null;
  galleryCategoryId: Types.ObjectId;
  name: string;
  description: string | null;
  params: string | null;
  type: GalleryTypeEnum;
  image?: string | null;
  imageSavePath?: string | null;
  thumbnailImage?: string | null;
  thumbnailImageSavePath?: string | null;
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
      required: true,
      ref:'GalleryCategory'
    },
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 200
    },
    type: {
      type: Schema.Types.Number,
      required: true
    },
    description: {
      type: Schema.Types.String,
      maxlength: 500
    },
    params: {
      type: Schema.Types.String
    },
    image: {
      type: Schema.Types.String
    },
    imageSavePath: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    thumbnailImage: {
      type: Schema.Types.String
    },
    thumbnailImageSavePath: {
      type: Schema.Types.String,
      maxlength: 5000
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
