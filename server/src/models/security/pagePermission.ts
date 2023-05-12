import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'PagePermission';
export const COLLECTION_NAME = 'pagePermissions';

export default interface PagePermission {
  _id: Types.ObjectId;
  pageId: Types.ObjectId;
  permissionId: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy?: Types.ObjectId;
  updatedAt?: Date;
}

const schema = new Schema<PagePermission>(
  {
    pageId: {
      type: Schema.Types.ObjectId,
      ref:'Page'
    },
    permissionId: {
      type: Schema.Types.ObjectId,
      ref:'Permission'
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

schema.index({ pageId: 1, permissionId: 1 });

export const PagePermissionModel = model<PagePermission>(DOCUMENT_NAME, schema, COLLECTION_NAME);
