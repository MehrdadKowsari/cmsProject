import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'PostTag';
export const COLLECTION_NAME = 'postTags';

export  interface PostTag {
  _id: Types.ObjectId | null;
  postId: Types.ObjectId;
  tagId: Types.ObjectId;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<PostTag>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Post'
    },
    tagId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Tag'
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

const PostModel = model<PostTag>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
