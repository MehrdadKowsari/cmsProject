import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'PostCategory';
export const COLLECTION_NAME = 'postCategories';

export  interface PostCategory {
  _id: Types.ObjectId | null;
  parentId?: Types.ObjectId;
  name: string;
  description: string;
  priority: number;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<PostCategory>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref:'PostCategory'
    },
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 200
    },
    description: {
      type: Schema.Types.String,
      maxlength: 500
    },
    priority: {
      type: Schema.Types.Number,
      required: true
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
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
  }
);

const PostCategoryModel = model<PostCategory>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostCategoryModel;
