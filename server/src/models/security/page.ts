import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Page';
export const COLLECTION_NAME = 'pages';

export  interface Page {
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
}

const schema = new Schema<Page>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref:'Page'
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
      required: true,
      maxlength: 500
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
  },
  {
    versionKey: false,
  },
);

const PageModel = model<Page>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PageModel;
