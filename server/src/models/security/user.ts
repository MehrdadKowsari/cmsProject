import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String },
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

const User = mongoose.model('User', userSchema);
export default User;