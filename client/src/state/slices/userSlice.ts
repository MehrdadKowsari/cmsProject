import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { AddUserDTO } from 'src/models/security/user/addUserDTO';
import { UpdateUserDTO } from 'src/models/security/user/updateUserDTO';
import { UpdateUserProfileDTO } from 'src/models/security/user/updateUserProfileDTO';
import { UserDTO } from 'src/models/security/user/userDTO';
import { IntialState } from '../interfaces/intialState';
import { ChangeUserPasswordDTO } from 'src/models/security/user/changeUserPasswordDTO';
import { ResetUserPasswordDTO } from 'src/models/security/user/resetUserPasswordDTO';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/user`;

export const add = createAsyncThunk(
  "users/add", 
  async (user: AddUserDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, user)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const getAllUsers = createAsyncThunk(
  "users/getAll", 
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
  "users/getAllByParams", 
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
  'users/getById',
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

export const getByUsername = createAsyncThunk(
  'users/getByUsername',
  async (username: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/getByUsername`, username);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const getCurrent = createAsyncThunk(
  'users/getCurrent',
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

export const isExistUserByUsername = createAsyncThunk(
  'users/isExistUserByUsername',
  async (username: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/isExistUserByUsername`, username);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const update = createAsyncThunk(
  "users/update", 
  async (user: UpdateUserDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/update`, user)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const updateProfile = createAsyncThunk(
  "users/updateProfile", 
  async (user: UpdateUserProfileDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/updateProfile`, user)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const changePassword = createAsyncThunk(
  "users/changePassword", 
  async (changePassword: ChangeUserPasswordDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/changePassword`, changePassword)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const resetPassword = createAsyncThunk(
  "users/resetPassword", 
  async (resetPassword: ResetUserPasswordDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/resetPassword`, resetPassword)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const toggleActive = createAsyncThunk(
  'users/toggleActive',
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

export const remove = createAsyncThunk(
  'users/delete',
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

interface UserState extends IntialState {
  users: UserDTO[] | null,
  user: UserDTO | null
}

const initialState: UserState = {
    users: null,
    user: null,
    isLoading: false,
    hasError: false,
    totalCount: 0,
    currentPage: 1,
    numberOfPages: null,
    error: ''
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(add.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(add.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(add.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getAllByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllByParams.fulfilled, (state, { payload }) => {
            state.users = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllByParams.rejected, (state, { payload }) => {
            state.users = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllUsers.fulfilled, (state, { payload }) => {
            state.users = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllUsers.rejected, (state, { payload }) => {
            state.users = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getById.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getById.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getById.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getByUsername.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getByUsername.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getByUsername.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getCurrent.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getCurrent.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getCurrent.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(isExistUserByUsername.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(isExistUserByUsername.fulfilled, (state) => {
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(isExistUserByUsername.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(update.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(update.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
          })
          .addCase(update.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(updateProfile.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
          })
          .addCase(updateProfile.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(changePassword.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(changePassword.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
          })
          .addCase(changePassword.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(resetPassword.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
            state.error = <string>payload;
          })
          .addCase(resetPassword.rejected, (state, { payload }) => {
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

export default userSlice.reducer;