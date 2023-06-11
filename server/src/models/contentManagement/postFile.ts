import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'PostFile';
export const COLLECTION_NAME = 'postFiles';

export  interface PostFile {
  _id: Types.ObjectId | null;
  postId: Types.ObjectId;
  name: string;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  fileSize: number | null;
  downloadCount: number;
  priority: number | null;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<PostFile>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Post'
    },
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 2000
    },
    description: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    file: {
      type: Schema.Types.String
    },
    fileSavePath: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    fileExtension: {
      type: Schema.Types.String,
      maxlength: 200
    },
    fileSize: {
      type: Schema.Types.Number
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

const PostModel = model<PostFile>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
