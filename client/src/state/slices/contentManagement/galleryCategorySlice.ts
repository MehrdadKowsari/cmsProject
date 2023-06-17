import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { AddGalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/addGalleryCategoryDTO';
import { UpdateGalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/updateGalleryCategoryDTO';
import { GalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/galleryCategoryDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/galleryCategory`;

export const add = createAsyncThunk(
  "galleryCategories/add", 
  async (galleryCategory: AddGalleryCategoryDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, galleryCategory)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const getAllGalleryCategories = createAsyncThunk(
  "galleryCategories/getAll", 
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
  "galleryCategories/getAllByParams", 
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
  'galleryCategories/getById',
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
  "galleryCategories/update", 
  async (galleryCategory: UpdateGalleryCategoryDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/update`, galleryCategory)
      return data?.result;
    } catch (err) {
        const error= err as AxiosError;
        return rejectWithValue(error.message);
    }
});

export const toggleActive = createAsyncThunk(
  'galleryCategories/toggleActive',
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
  'galleryCategories/delete',
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


interface GalleryCategoryState extends IntialState {
  galleryCategories: GalleryCategoryDTO[] | null,
  galleryCategory: GalleryCategoryDTO | null
}

const initialState: GalleryCategoryState = {
    galleryCategories: null,
    galleryCategory: null,
    isLoading: false,
    hasError: false,
    totalCount: 0,
    currentPage: 1,
    numberOfPages: null,
    error: ''
}

const galleryCategorySlice = createSlice({
    name: 'galleryCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(add.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(add.fulfilled, (state, { payload }) => {
            state.galleryCategory = payload;
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
            state.galleryCategories = payload.rows;
            state.totalCount = payload.totalCount;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllByParams.rejected, (state, { payload }) => {
            state.galleryCategories = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getById.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getById.fulfilled, (state, { payload }) => {
            state.galleryCategory = payload;
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
            state.galleryCategory = payload;
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

export default galleryCategorySlice.reducer;