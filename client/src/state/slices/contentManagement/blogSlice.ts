import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { PostDTO } from 'src/models/contentManagement/post/postDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListPublishedPostByParamsDTO } from 'src/models/contentManagement/post/listPublishedPostByParamsDTO';
import { ListMostCommentedPostByParamsDTO } from 'src/models/contentManagement/post/listMostCommentedPostByParamsDTO';
import { ListMostPopularPostByParamsDTO } from 'src/models/contentManagement/post/listMostPopularPostByParamsDTO';
import { ListLastPostByParamsDTO } from 'src/models/contentManagement/post/listLastPostByParamsDTO';
import { AddPostCommentDTO } from 'src/models/contentManagement/postComment/addPostCommentDTO';

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

export const getAllMostCommentedPostsByParams = createAsyncThunk(
  "blog/getAllMostCommentedPostsByParams", 
  async (listMostCommentedPostByParamsDTO : ListMostCommentedPostByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllMostCommentedPostsByParams`, listMostCommentedPostByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getAllMostPopularPostsByParams = createAsyncThunk(
  "blog/getAllMostPopularPostsByParams", 
  async (listMostPopularPostByParamsDTO : ListMostPopularPostByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllMostPopularPostsByParams`, listMostPopularPostByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getAllLastPostsByParams = createAsyncThunk(
  "blog/getAllLastPostsByParams", 
  async (listLastPostByParamsDTO : ListLastPostByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllLastPostsByParams`, listLastPostByParamsDTO);
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

export const getPageBySlugUrl = createAsyncThunk(
  'blog/getPageBySlugUrl',
  async (id: string, { rejectWithValue }) => {
      try {
          const { data } = await axios.post(`${API_URL}/getPageBySlugUrl`, id);
          return data?.result;
      } catch (err) {
          const error= err as AxiosError;
          return rejectWithValue(error.message);
      }
  }
)

export const addPostComment = createAsyncThunk(
  "blog/addPostComment", 
  async (post: AddPostCommentDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/addPostComment`, post)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

interface PostState extends IntialState {
  posts: PostDTO[] | null,
  mostCommentedPosts: PostDTO[] | null,
  mostPopularPosts: PostDTO[] | null,
  lastPosts: PostDTO[] | null,
  post: PostDTO | null,
  page: PostDTO | null,
}

const initialState: PostState = {
    posts: [],
    mostCommentedPosts: [],
    mostPopularPosts: [],
    lastPosts: [],
    post: null,
    page: null,
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
          .addCase(addPostComment.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(addPostComment.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(addPostComment.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

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
            state.posts = [];
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getAllMostCommentedPostsByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllMostCommentedPostsByParams.fulfilled, (state, { payload }) => {
            state.mostCommentedPosts = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllMostCommentedPostsByParams.rejected, (state, { payload }) => {
            state.mostCommentedPosts = [];
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getAllMostPopularPostsByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllMostPopularPostsByParams.fulfilled, (state, { payload }) => {
            state.mostPopularPosts = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllMostPopularPostsByParams.rejected, (state, { payload }) => {
            state.mostPopularPosts = [];
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getAllLastPostsByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllLastPostsByParams.fulfilled, (state, { payload }) => {
            state.lastPosts = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllLastPostsByParams.rejected, (state, { payload }) => {
            state.lastPosts = [];
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
          
          .addCase(getPageBySlugUrl.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getPageBySlugUrl.fulfilled, (state, { payload }) => {
            state.page = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getPageBySlugUrl.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default blogSlice.reducer;