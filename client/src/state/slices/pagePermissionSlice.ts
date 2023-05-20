import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { AddPagePermissionDTO } from 'src/models/security/pagePermission/addPagePermissionDTO';
import { UpdatePagePermissionDTO } from 'src/models/security/pagePermission/updatePagePermissionDTO';
import { PagePermissionDTO } from 'src/models/security/pagePermission/pagePermissionDTO';
import { IntialState } from '../interfaces/intialState';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/pagePermission`;

export const add = createAsyncThunk(
  "pagePermission/add", 
  async (pagePermission: AddPagePermissionDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, pagePermission)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const getAllPagePermissions = createAsyncThunk(
  "pagePermission/getAll", 
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAll`);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getAllByParams = createAsyncThunk(
  "pagePermission/getAllByParams", 
  async (gridParameter: GridParameter, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllByParams`, gridParameter);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getById = createAsyncThunk(
  'pagePermission/getById',
  async (id: string | number, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/getById`, id);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const update = createAsyncThunk(
  "pagePermission/update", 
  async (pagePermission: UpdatePagePermissionDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/update`, pagePermission)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const remove = createAsyncThunk(
  'pagePermission/delete',
  async (id: string | number, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/delete`, id);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

interface PagePermissionState extends IntialState {
  pagePermissions: PagePermissionDTO[] | null,
  pagePermission: PagePermissionDTO | null
}

const initialState: PagePermissionState = {
    pagePermissions: null,
    pagePermission: null,
    isLoading: false,
    hasError: false,
    totalCount: 0,
    currentPage: 1,
    numberOfPages: null,
    error: ''
}

const pagePermissionSlice = createSlice({
    name: 'pagePermission',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(add.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(add.fulfilled, (state, { payload }) => {
            state.pagePermissions = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(add.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getAllPagePermissions.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllPagePermissions.fulfilled, (state, { payload }) => {
            state.pagePermissions = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllPagePermissions.rejected, (state, { payload }) => {
            state.pagePermissions = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getAllByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllByParams.fulfilled, (state, { payload }) => {
            state.pagePermissions = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllByParams.rejected, (state, { payload }) => {
            state.pagePermissions = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getById.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getById.fulfilled, (state, { payload }) => {
            state.pagePermission = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getById.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(update.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(update.fulfilled, (state, { payload }) => {
            state.pagePermission = payload;
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
          })
          .addCase(update.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(remove.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(remove.fulfilled, (state) => {
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(remove.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default pagePermissionSlice.reducer;