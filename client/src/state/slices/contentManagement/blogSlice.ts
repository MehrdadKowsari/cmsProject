import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { PostDTO } from 'src/models/contentManagement/post/postDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListPublishedPostByParamsDTO } from 'src/models/contentManagement/post/listPublishedPostByParamsDTO';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/blog`;

export const getAllPublishedPostsByParams = createAsyncThunk(
  "blog/getAllPublishedPostsByParams", 
  async (listPublishedPostByParamsDTO : ListPublishedPostByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllPublishedPostsByParams`, listPublishedPostByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getBySlugUrl = createAsyncThunk(
  'blog/getBySlugUrl',
  async (id: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/getBySlugUrl`, id);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

interface PostState extends IntialState {
  posts: PostDTO[] | null,
  post: PostDTO | null
}

const initialState: PostState = {
    posts: null,
    post: null,
    totalCount: 0,
    isLoading: false,
    hasError: false,
    error: ''
}

const blogSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllPublishedPostsByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllPublishedPostsByParams.fulfilled, (state, { payload }) => {
            state.posts = payload.rows;
            state.totalCount = payload.totalCount,
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllPublishedPostsByParams.rejected, (state, { payload }) => {
            state.posts = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getBySlugUrl.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getBySlugUrl.fulfilled, (state, { payload }) => {
            state.post = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getBySlugUrl.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default blogSlice.reducer;