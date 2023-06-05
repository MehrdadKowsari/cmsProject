import { Schema, model, Types } from 'mongoose';
import { Gallery } from './gallery';

export const DOCUMENT_NAME = 'GalleyCategory';
export const COLLECTION_NAME = 'galleryCategories';

export  interface GalleyCategory {
  _id: Types.ObjectId | null;
  parentId?: Types.ObjectId;
  name: string;
  priority: number;
  iconClass?: string;
  isActive: boolean;
  isHidden: boolean;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  galleries?: Gallery[] | null;
}

const schema = new Schema<GalleyCategory>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref:'GalleyCategory'
    },
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 100
    },
    priority: {
      type: Schema.Types.Number,
      required: true
    },
    iconClass: {
      type: Schema.Types.String,
      maxlength: 100
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
      required: true
    },
    isHidden: {
      type: Schema.Types.Boolean,
      default: false,
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

const GalleyCategoryModel = model<GalleyCategory>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default GalleyCategoryModel;
