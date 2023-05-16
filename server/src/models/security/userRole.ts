import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'UserRole';
export const COLLECTION_NAME = 'userRoles';

export interface UserRole {
  _id: Types.ObjectId | null;
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy?: Types.ObjectId;
  updatedAt?: Date;
}

const schema = new Schema<UserRole>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref:'Role'
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

schema.index({ roleId: 1, userId: 1 });

const UserRoleModel = model<UserRole>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default UserRoleModel;
