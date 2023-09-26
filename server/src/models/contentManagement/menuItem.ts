import { Schema, model, Types } from 'mongoose';
import { MenuItemTypeEnum } from '../../enums/contentManagement/menuItemTypeEnum';

export const DOCUMENT_NAME = 'MenuItem';
export const COLLECTION_NAME = 'menueItems';

export  interface MenuItem {
  _id: Types.ObjectId | null;
  menuId: Types.ObjectId;
  parentId: Types.ObjectId | null;
  name: string | null;
  description: string | null;
  type: MenuItemTypeEnum,
  image: string | null;
  imageSavePath: string | null;
  level: number | null;
  url: string;
  slugUrl: string | null;
  target: string | null;
  iconCssClass: string | null;
  iconSavePath: string | null;
  isActive: boolean,
  priority: number | null;
  createdAt?: Date;
  createdBy?: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
}

const schema = new Schema<MenuItem>(
  {
    menuId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Menu'
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref:'MenuItem'
    },
    name: {
      type: Schema.Types.String,
      maxlength: 200
    },
    description: {
      type: Schema.Types.String,
      maxlength: 500
    },
    type: {
      type: Schema.Types.Number,
      required: true
    },
    image: {
      type: Schema.Types.String
    },
    imageSavePath: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    level: {
      type: Schema.Types.Number
    },
    url: {
      type: Schema.Types.String,
      maxlength: 2000
    },
    slugUrl: {
      type: Schema.Types.String,
      maxlength: 5000
    },
    target: {
      type: Schema.Types.String,
      maxlength: 50
    },
    iconCssClass: {
      type: Schema.Types.String,
      maxlength: 500
    },
    iconSavePath: {
      type: Schema.Types.String
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

const PostModel = model<MenuItem>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default PostModel;
