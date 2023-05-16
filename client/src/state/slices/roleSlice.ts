import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { AddRoleDTO } from 'src/models/security/role/addRoleDTO';
import { UpdateRoleDTO } from 'src/models/security/role/updateRoleDTO';
import { RoleDTO } from 'src/models/security/role/roleDTO';
import { IntialState } from '../interfaces/intialState';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/role`;

export const add = createAsyncThunk(
  "roles/add", 
  async (role: AddRoleDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, role)
      return data?.result;;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const getAll = createAsyncThunk(
  "roles/getAll", 
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
  'roles/getById',
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

export const getByRolename = createAsyncThunk(
  'roles/getByRolename',
  async (rolename: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/getByRolename`, rolename);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const update = createAsyncThunk(
  "roles/update", 
  async (role: UpdateRoleDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/update`, role)
      return data?.result;;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const remove = createAsyncThunk(
  'roles/delete',
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
  'roles/toggleActive',
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
  'roles/getCurrent',
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

export const isExistRoleByRolename = createAsyncThunk(
  'roles/isExistRoleByRolename',
  async (rolename: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/isExistRoleByRolename`, rolename);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

interface RoleState extends IntialState {
  roles: RoleDTO[] | null,
  role: RoleDTO | null
}

const initialState: RoleState = {
    roles: null,
    role: null,
    isLoading: false,
    hasError: false,
    totalCount: 0,
    currentPage: 1,
    numberOfPages: null,
    error: ''
}

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(add.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(add.fulfilled, (state, { payload }) => {
            state.role = payload;
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
            state.roles = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAll.rejected, (state, { payload }) => {
            state.roles = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getById.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getById.fulfilled, (state, { payload }) => {
            state.role = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getById.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getByRolename.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getByRolename.fulfilled, (state, { payload }) => {
            state.role = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getByRolename.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getCurrent.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getCurrent.fulfilled, (state, { payload }) => {
            state.role = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getCurrent.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(isExistRoleByRolename.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(isExistRoleByRolename.fulfilled, (state) => {
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(isExistRoleByRolename.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(update.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(update.fulfilled, (state, { payload }) => {
            state.role = payload;
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

export default roleSlice.reducer;