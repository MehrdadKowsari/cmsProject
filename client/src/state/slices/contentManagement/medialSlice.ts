import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { GalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/galleryCategoryDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListActiveGalleryCategoryByParamsDTO } from 'src/models/contentManagement/galleryCategory/listActiveGalleryCategoryByParamsDTO';
import { GalleryDTO } from 'src/models/contentManagement/gallery/galleryDTO';
import { ListActiveGalleryByParamsDTO } from 'src/models/contentManagement/gallery/listActiveGalleryByParamsDTO';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/media`;

export const getAllGalleryCategoriesByParams = createAsyncThunk(
  "media/getAllGalleryCategoriesByParams", 
  async (getAllGalleryCategoriesByParamsDTO : ListActiveGalleryCategoryByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllGalleryCategoriesByParams`, getAllGalleryCategoriesByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getAllGalleriesByParams = createAsyncThunk(
  "media/getAllGalleriesByParams", 
  async (getAllGalleriesByParamsDTO : ListActiveGalleryByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllGalleriesByParams`, getAllGalleriesByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

interface MediaState extends IntialState {
  Galleries: GalleryDTO[];
  galleryCategories: GalleryCategoryDTO[] | null
}

const initialState: MediaState = {
    Galleries: [],
    galleryCategories: null,
    isLoading: false,
    hasError: false,
    error: ''
}

const mediaSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllGalleryCategoriesByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllGalleryCategoriesByParams.fulfilled, (state, { payload }) => {
            state.galleryCategories = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllGalleryCategoriesByParams.rejected, (state, { payload }) => {
            state.galleryCategories = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getAllGalleriesByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllGalleriesByParams.fulfilled, (state, { payload }) => {
            state.galleryCategories = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllGalleriesByParams.rejected, (state, { payload }) => {
            state.galleryCategories = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default mediaSlice.reducer;