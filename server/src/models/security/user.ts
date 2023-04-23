import mongoose, { Types } from "mongoose";

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export interface User{
    _id: Types.ObjectId | null,
    firstName?: string,
    lastName?: string,
    email: string,
    userName: string,
    password?: string,
    passwordSalt?: string,
    image?: string,
    thumbnailImage?: string,
    phoneNumber?: string,
    language?: string,
    isActive?: boolean,
    isCreatedByExternalAccount?: boolean,
    createDate?: Date,
    createdBy?: string,
    lastUpdateDate?: Date,
};

const userSchema = new mongoose.Schema<User>({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String },
    passwordSalt: { type: String },
    image: { type: String },
    thumbnailImage: { type: String },
    phoneNumber: { type: String },
    language: { type: String, default: 'en' },
    isActive: { type: Boolean, default: true },
    isCreatedByExternalAccount: { type: Boolean, default: false},
    createDate: { type: Date, default: Date.now() },
    createdBy: { type: String },
    lastUpdateDate: { type: Date },
    
})

const UserModel = mongoose.model<User>(DOCUMENT_NAME, userSchema, COLLECTION_NAME);
export default UserModel;