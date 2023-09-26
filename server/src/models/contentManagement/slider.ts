import { Schema, model, Types } from 'mongoose';
import { SliderTypeEnum } from '../../enums/contentManagement/sliderTypeEnum';
import { SliderItem } from './sliderItem';

export const DOCUMENT_NAME = 'Slider';
export const COLLECTION_NAME = 'sliders';

export  interface Slider {
  _id: Types.ObjectId | null;
  poetCategoryId?: Types.ObjectId | null;
  galleryId?: Types.ObjectId | null;
  name: string;
  description: string | null;
  type: SliderTypeEnum;
  params: string | null;
  sectionName: string | null;
  allowedFileExtension: string | null;
  priority: number | number;
  isActive: boolean;
  locale: string | null;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  sliderItems?: SliderItem[] | null;
}

const schema = new Schema<Slider>(
  {
    poetCategoryId: {
      type: Schema.Types.ObjectId,
      ref:'PostCategory'
    },
    galleryId: {
      type: Schema.Types.ObjectId,
      ref:'Gallery'
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
    sectionName: {
      type: Schema.Types.String,
      maxlength: 200
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

const SliderModel = model<Slider>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default SliderModel;
