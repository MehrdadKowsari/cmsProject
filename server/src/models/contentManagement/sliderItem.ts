import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'SliderItem';
export const COLLECTION_NAME = 'sliderItems';

export  interface SliderItem {
  _id: Types.ObjectId | null;
  sliderId: Types.ObjectId;
  name: string | null;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  linkUrl: string | null;
  linkTarget: string | null;
  isActive:boolean;
  priority: number | null;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<SliderItem>(
  {
    sliderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Gallery'
    },
    name: {
      type: Schema.Types.String,
      maxlength: 2000
    },
    description: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    file: {
      type: Schema.Types.String
    },
    fileSavePath: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    fileExtension: {
      type: Schema.Types.String,
      maxlength: 200
    },
    linkUrl: {
      type: Schema.Types.String
    },
    linkTarget: {
      type: Schema.Types.String
    },
    isActive: {
      type: Schema.Types.Boolean,
      required: true,
      default: true
    },
    priority: {
      type: Schema.Types.Number
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

const GalleryModel = model<SliderItem>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default GalleryModel;
