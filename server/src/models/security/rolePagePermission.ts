import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'RolePagePermission';
export const COLLECTION_NAME = 'rolePagePermissions';

export default interface RolePagePermission {
  _id: Types.ObjectId;
  roleId: Types.ObjectId;
  pagePermissionId: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy?: Types.ObjectId;
  updatedAt?: Date;
}

const schema = new Schema<RolePagePermission>(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      ref:'Role'
    },
    pagePermissionId: {
      type: Schema.Types.ObjectId,
      ref:'PagePermission'
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

schema.index({ roleId: 1, pagePermissionId: 1 });

export const RolePagePermissionModel = model<RolePagePermission>(DOCUMENT_NAME, schema, COLLECTION_NAME);
