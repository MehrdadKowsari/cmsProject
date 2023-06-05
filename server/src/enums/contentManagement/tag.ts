import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Tag';
export const COLLECTION_NAME = 'tags';

export interface Tag {
  _id: Types.ObjectId | null;
  name: string;
  locale?: string | null;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<Tag>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 500
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
      required: true
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
  },
  {
    versionKey: false,
  },
);

schema.index({ name: 1 });

const RoleModel = model<Tag>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default RoleModel;
