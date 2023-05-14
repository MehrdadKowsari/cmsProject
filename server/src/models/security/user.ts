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
    createdAt?: Date,
    createdBy?: string,
    updatedAt?: Date,
    updatedBy?: string,
};

const schema = new mongoose.Schema<User>({
    firstName: { 
        type: String 
    },
    lastName: { 
        type: String 
    },
    email: { 
        type: String, 
        required: true 
    },
    userName: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String 
    },
    passwordSalt: { 
        type: String 
    },
    image: { 
        type: String 
    },
    thumbnailImage: { 
        type: String 
    },
    phoneNumber: { 
        type: String 
    },
    language: { 
        type: String, 
        default: 'en' 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    isCreatedByExternalAccount: { 
        type: Boolean, 
        default: false
    },
    createdAt: { 
        type: Date, 
        default: Date.now() 
    },
    createdBy: { 
        type: Types.ObjectId,
        ref: 'User' 
    },
    updatedAt: { 
        type: Date 
    },
    updatedBy: { 
        type: Types.ObjectId,
        ref: 'User' 
    },
    
});

schema.index({userName: 1})

const UserModel = mongoose.model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default UserModel;