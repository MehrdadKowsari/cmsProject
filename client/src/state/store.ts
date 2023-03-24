import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import confirmReducer from './slices/confirmSlice';
import userReducer from './slices/userSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        confirm: confirmReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
