import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'PostImage';
export const COLLECTION_NAME = 'postImages';

export  interface PostImage {
  _id: Types.ObjectId | null;
  postId: Types.ObjectId;
  name: string | null;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  downloadCount: number;
  priority: number | null;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<PostImage>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Post'
    },
    name: {
      type: Schema.Types.String,
      maxlength: 2000
    },
    description: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    image: {
      type: Schema.Types.String
    },
    imageSavePath: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    downloadCount: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    priority: {
      type: Schema.Types.Number
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

const PostModel = model<PostImage>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
