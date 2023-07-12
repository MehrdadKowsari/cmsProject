import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { AddPostFileDTO } from 'src/models/contentManagement/postFile/addPostFileDTO';
import { UpdatePostFileDTO } from 'src/models/contentManagement/postFile/updatePostFileDTO';
import { PostFileDTO } from 'src/models/contentManagement/postFile/postFileDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListPostFileByParamsDTO } from 'src/models/contentManagement/postFile/listPostFileByParamsDTO';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/post`;

export const add = createAsyncThunk(
  "postFiles/add", 
  async (post: AddPostFileDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, post)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const getAllPostFiles = createAsyncThunk(
  "postFiles/getAll", 
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
  "postFiles/getAllByParams", 
  async (listPostFileByParams: ListPostFileByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllByParams`, listPostFileByParams);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getById = createAsyncThunk(
  'postFiles/getById',
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
  "postFiles/update", 
  async (post: UpdatePostFileDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/update`, post)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const remove = createAsyncThunk(
  'postFiles/delete',
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


interface PostFileState extends IntialState {
  postFiles: PostFileDTO[] | null,
  post: PostFileDTO | null
}

const initialState: PostFileState = {
    postFiles: null,
    post: null,
    isLoading: false,
    hasError: false,
    totalCount: 0,
    currentPage: 1,
    numberOfPages: null,
    error: ''
}

const postSlice = createSlice({
    name: 'postFiles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(add.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(add.fulfilled, (state, { payload }) => {
            state.post = payload;
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
            state.postFiles = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllByParams.rejected, (state, { payload }) => {
            state.postFiles = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getById.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getById.fulfilled, (state, { payload }) => {
            state.post = payload;
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
            state.post = payload;
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

export default postSlice.reducer;