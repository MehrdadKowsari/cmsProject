import { Schema, model, Types } from 'mongoose';
import { MenuItemType } from 'src/enums/contentManagement/menuItemTypeEnum';

export const DOCUMENT_NAME = 'MenuItem';
export const COLLECTION_NAME = 'menueItems';

export  interface MenuItem {
  _id: Types.ObjectId | null;
  menuId: Types.ObjectId | null;
  parentId: Types.ObjectId | null;
  name: string | null;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  level: number | null;
  url: string;
  slugUrl: string | null;
  target: string;
  rel: string | null;
  iconCssClass: string | null;
  iconSavePath: string | null;
  type: MenuItemType,
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
      ref:'Menu'
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref:'MenuItem'
    },
    name: {
      type: Schema.Types.String,
      maxlength: 500
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
    level: {
      type: Schema.Types.Number
    },
    url: {
      type: Schema.Types.String,
      required: true
    },
    slugUrl: {
      type: Schema.Types.String
    },
    target: {
      type: Schema.Types.String,
      required: true
    },
    rel: {
      type: Schema.Types.String
    },
    iconCssClass: {
      type: Schema.Types.String
    },
    iconSavePath: {
      type: Schema.Types.String
    },
    type: {
      type: Schema.Types.Number,
      required: true
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
