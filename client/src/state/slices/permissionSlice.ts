import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { AddPermissionDTO } from 'src/models/security/permission/addPermissionDTO';
import { UpdatePermissionDTO } from 'src/models/security/permission/updatePermissionDTO';
import { PermissionDTO } from 'src/models/security/permission/permissionDTO';
import { IntialState } from '../interfaces/intialState';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/permission`;

export const add = createAsyncThunk(
  "permissions/add", 
  async (permission: AddPermissionDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, permission)
      return data?.result;;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const getAll = createAsyncThunk(
  "permissions/getAll", 
  async (gridParameter: GridParameter, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/fetchAll`, gridParameter);
      return data?.result;;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getById = createAsyncThunk(
  'permissions/getById',
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

export const getByPermissionname = createAsyncThunk(
  'permissions/getByPermissionname',
  async (permissionname: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/getByPermissionname`, permissionname);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const update = createAsyncThunk(
  "permissions/update", 
  async (permission: UpdatePermissionDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/update`, permission)
      return data?.result;;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const remove = createAsyncThunk(
  'permissions/delete',
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

export const toggleActive = createAsyncThunk(
  'permissions/toggleActive',
  async (id: string | number, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/toggleActive`, id);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const getCurrent = createAsyncThunk(
  'permissions/getCurrent',
  async (_, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/getCurrent`);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const isExistPermissionByPermissionname = createAsyncThunk(
  'permissions/isExistPermissionByPermissionname',
  async (permissionname: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/isExistPermissionByPermissionname`, permissionname);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

interface PermissionState extends IntialState {
  permissions: PermissionDTO[] | null,
  permission: PermissionDTO | null
}

const initialState: PermissionState = {
    permissions: null,
    permission: null,
    isLoading: false,
    hasError: false,
    totalCount: 0,
    currentPage: 1,
    numberOfPages: null,
    error: ''
}

const permissionSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(add.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(add.fulfilled, (state, { payload }) => {
            state.permission = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(add.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getAll.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAll.fulfilled, (state, { payload }) => {
            state.permissions = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAll.rejected, (state, { payload }) => {
            state.permissions = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getById.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getById.fulfilled, (state, { payload }) => {
            state.permission = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getById.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getByPermissionname.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getByPermissionname.fulfilled, (state, { payload }) => {
            state.permission = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getByPermissionname.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getCurrent.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getCurrent.fulfilled, (state, { payload }) => {
            state.permission = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getCurrent.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(isExistPermissionByPermissionname.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(isExistPermissionByPermissionname.fulfilled, (state) => {
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(isExistPermissionByPermissionname.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(update.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(update.fulfilled, (state, { payload }) => {
            state.permission = payload;
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
          })
          .addCase(update.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(toggleActive.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(toggleActive.fulfilled, (state) => {
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(toggleActive.rejected, (state, { payload }) => {
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

export default permissionSlice.reducer;