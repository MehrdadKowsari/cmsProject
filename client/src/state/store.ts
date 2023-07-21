import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';
import permissionReducer from './slices/permissionSlice';
import pagePermissionReducer from './slices/pagePermissionSlice';
import rolePagePermissionReducer from './slices/rolePagePermissionSlice';
import pageReducer from './slices/pageSlice';
import userRoleReducer from './slices/userRoleSlice';
import postCategoryReducer from './slices/contentManagement/postCategorySlice';
import postReducer from './slices/contentManagement/postSlice';
import postCommentReducer from './slices/contentManagement/postCommentSlice';
import postFileReducer from './slices/contentManagement/postFileSlice';
import postImageReducer from './slices/contentManagement/postImageSlice';
import postTagReducer from './slices/contentManagement/postTagSlice';
import relatedPostReducer from './slices/contentManagement/relatedPostSlice';
import galleryCategoryReducer from './slices/contentManagement/galleryCategorySlice';
import galleryReducer from './slices/contentManagement/gallerySlice';
import galleryFileReducer from './slices/contentManagement/galleryFileSlice';
import tagReducer from './slices/contentManagement/tagSlice';
import sliderReducer from './slices/contentManagement/sliderSlice';
import sliderItemReducer from './slices/contentManagement/sliderItemSlice';
import menuReducer from './slices/contentManagement/menuSlice';
import menuItemReducer from './slices/contentManagement/menuItemSlice';
import homeReducer from './slices/contentManagement/homeSlice';

export const store = configureStore({
    reducer: {
        
        auth: authReducer,
        user: userReducer,
        role: roleReducer,
        permission: permissionReducer,
        page: pageReducer,
        pagePermission: pagePermissionReducer,
        rolePagePermission: rolePagePermissionReducer,
        userRole: userRoleReducer,
        
        galleryCategory: galleryCategoryReducer,
        gallery: galleryReducer,
        galleryFile: galleryFileReducer,
        postCategory: postCategoryReducer,
        post: postReducer,
        postComment: postCommentReducer,
        postFile: postFileReducer,
        postImage: postImageReducer,
        postTag: postTagReducer,
        relatedPost: relatedPostReducer,
        tag: tagReducer,
        slider: sliderReducer,
        sliderItem: sliderItemReducer,
        menu: menuReducer,
        menuItem: menuItemReducer,
        home: homeReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
