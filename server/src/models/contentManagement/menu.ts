import { Schema, model, Types } from 'mongoose';
import { MenuItem } from './menuItem';

export const DOCUMENT_NAME = 'Menu';
export const COLLECTION_NAME = 'menus';

export  interface Menu {
  _id: Types.ObjectId | null;
  name: string | null;
  description: string | null;
  sectionName: string | null;
  priority: number | null;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  menuItems?: MenuItem[] 
}

const schema = new Schema<Menu>(
  {
    name: {
      type: Schema.Types.String,
      maxlength: 200
    },
    description: {
      type: Schema.Types.String,
      maxlength: 2000
    },
    sectionName: {
      type: Schema.Types.String,
      maxlength: 200
    },
    isActive: {
      type: Schema.Types.Boolean,
      required: true,
      default: true
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

const PostModel = model<Menu>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
