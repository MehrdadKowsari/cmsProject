import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import confirmReducer from './slices/confirmSlice';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';
import permissionReducer from './slices/permissionSlice';
import pagePermissionReducer from './slices/pagePermissionSlice';
import rolePagePermissionReducer from './slices/rolePagePermissionSlice';
import pageReducer from './slices/pageSlice';
import userRoleReducer from './slices/userRoleSlice';
import tagReducer from './slices/contentManagement/tagSlice';

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
        tag: tagReducer,
        confirm: confirmReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
