import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export enum RoleCode {
  LEARNER = 'LEARNER',
  WRITER = 'WRITER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}

export default interface Role {
  _id: Types.ObjectId;
  name: string;
  type: string;
  isActive?: boolean;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<Role>(
  {
    name: {
      type: Schema.Types.String,
      required: true
    },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(RoleCode),
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      dafault: Date.now()
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true
    },
  },
  {
    versionKey: false,
  },
);

schema.index({ code: 1, status: 1 });

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
