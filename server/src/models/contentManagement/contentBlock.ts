import { Schema, model, Types } from 'mongoose';
export const DOCUMENT_NAME = 'ContentBlock';
export const COLLECTION_NAME = 'contentBlocks';

export  interface ContentBlock {
  _id: Types.ObjectId | null;
  title: string;
  content: string | null;
  sectionName: string | null;
  iconCssClass: string | null;
  image: string | null;
  thumbnailImage: string | null;
  priority: number | number;
  isActive: boolean;
  dateFrom: Date | null;
  dateTo: Date | null;
  locale: string | null;
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<ContentBlock>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 1000
    },
    content: {
      type: Schema.Types.String
    },
    sectionName: {
      type: Schema.Types.String,
      maxlength: 200
    },
    image: {
      type: Schema.Types.String
    },
    thumbnailImage: {
      type: Schema.Types.String
    },
    iconCssClass: {
      type: Schema.Types.String,
      maxlength: 500
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
    dateFrom: {
      type: Schema.Types.Date
    },
    dateTo: {
      type: Schema.Types.Date
    },
    locale: {
      type: Schema.Types.String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
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

const ContentBlockModel = model<ContentBlock>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default ContentBlockModel;
