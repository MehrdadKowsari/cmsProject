import { Schema, model, Types } from 'mongoose';
import { ConfirmStatusTypeEnum } from '../../enums/shared/confirmStatusTypeEnum';

export const DOCUMENT_NAME = 'PostComment';
export const COLLECTION_NAME = 'postComments';

export  interface PostComment {
  _id: Types.ObjectId | null;
  parentId?: Types.ObjectId | null;
  postId: Types.ObjectId;
  title: string | null;
  comment: string;
  fullName: string | null;
  email: string | null;
  website: string | null;
  ip: string | null;
  likeCount: number;
  dislikeCount: number;
  priority: number | null;
  status: ConfirmStatusTypeEnum;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<PostComment>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref:'PostComment'
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Post'
    },
    title: {
      type: Schema.Types.String,
      maxlength: 1000
    },
    comment: {
      type: Schema.Types.String,
      maxlength: 5000,
      required: true
    },
    email: {
      type: Schema.Types.String,
      maxlength: 200
    },
    fullName: {
      type: Schema.Types.String,
      maxlength: 200
    },
    website: {
      type: Schema.Types.String,
      maxlength: 200
    },
    ip: {
      type: Schema.Types.String,
      maxlength: 100
    },
    likeCount: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    dislikeCount: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    },
    priority: {
      type: Schema.Types.Number
    },
    status: {
      type: Schema.Types.Number,
      required: true,
      default: ConfirmStatusTypeEnum.Pending
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

const PostModel = model<PostComment>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
