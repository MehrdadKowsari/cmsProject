import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'RelatedPost';
export const COLLECTION_NAME = 'relatedPosts';

export  interface RelatedPost {
  _id: Types.ObjectId | null;
  postId: Types.ObjectId;
  relatedPostId: Types.ObjectId;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<RelatedPost>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Post'
    },
    relatedPostId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Post'
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

const PostModel = model<RelatedPost>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
