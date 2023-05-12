import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Permission';
export const COLLECTION_NAME = 'permissions';

export default interface Permission {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<Permission>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 100
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
      required: true
    },
    description: {
      type: Schema.Types.String,
      required: true,
      maxlength: 500
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

export const PermissionModel = model<Permission>(DOCUMENT_NAME, schema, COLLECTION_NAME);
