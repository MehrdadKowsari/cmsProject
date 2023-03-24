import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "src/api/axios";
import { SignIn } from "src/models/auth/SignIn";
import { SignUp } from "src/models/auth/SignUp";
import browserStorageService from "src/services/shared/browserStorageService";
import { IntialState } from "../interfaces/intialState";

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth`;

export const signIn = createAsyncThunk(
    'auth/sigeIn',
    async (signIn: SignIn, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/signIn`, signIn);
            return data?.result;
        } catch (err) {
            const error = <AxiosError>err;
            return rejectWithValue(error.message);
        }
    }
)

export const signInByGoogle = createAsyncThunk(
    'auth/signInByGoogle',
    async (token: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/signInByGoogle`, token);
            return data?.result;
        } catch (err) {
            const error = <AxiosError>err;
            return rejectWithValue(error.message);
        }
    }
)

export const signUp = createAsyncThunk(
    'auth/sigeUp',
    async (signUp: SignUp, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/signUp`, signUp);
            return data?.result;
        } catch (err) {
            const error = <AxiosError>err;
            return rejectWithValue(error.message);
        }
    }
)

interface AuthState extends IntialState {
    accessToken?: string | null;
    refreshToken?: string | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    hasError: false
}

const authSlice = createSlice({
    name: 'auth',
    reducers: {
        saveToken(state, { payload }){
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            browserStorageService.setLocal('accessToken', payload.accessToken);
            browserStorageService.setLocal('refreshToken', payload.refreshToken);
        }
    },
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(signIn.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(signIn.fulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            browserStorageService.setLocal('accessToken', payload.token);
            browserStorageService.setLocal('refreshToken', payload.refreshToken);
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(signIn.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
        })
        
        .addCase(signInByGoogle.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(signInByGoogle.fulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            browserStorageService.setLocal('accessToken', payload.token);
            browserStorageService.setLocal('refreshToken', payload.refreshToken);
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(signInByGoogle.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
        })
        
        .addCase(signUp.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(signUp.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(signUp.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
        })
    }
});
export const { saveToken } = authSlice.actions;
export default authSlice.reducer;