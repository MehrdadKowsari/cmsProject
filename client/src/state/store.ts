import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import confirmReducer from './slices/confirmSlice';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';
import permissionReducer from './slices/permissionSlice';
import userRoleReducer from './slices/userRoleSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        role: roleReducer,
        permission: permissionReducer,
        userRole: userRoleReducer,
        confirm: confirmReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
