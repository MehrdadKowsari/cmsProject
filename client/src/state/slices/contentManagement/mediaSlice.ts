import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { GalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/galleryCategoryDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListActiveGalleryCategoryByParamsDTO } from 'src/models/contentManagement/galleryCategory/listActiveGalleryCategoryByParamsDTO';
import { GalleryDTO } from 'src/models/contentManagement/gallery/galleryDTO';
import { ListActiveGalleryByParamsDTO } from 'src/models/contentManagement/gallery/listActiveGalleryByParamsDTO';
import { ListGalleryFileByParamsDTO } from 'src/models/contentManagement/galleryFile/listGalleryFileByParamsDTO';
import { GalleryFileDTO } from 'src/models/contentManagement/galleryFile/galleryFileDTO';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/media`;

export const getAllActiveGalleryCategoriesByParams = createAsyncThunk(
  "media/getAllActiveGalleryCategoriesByParams", 
  async (getAllActiveGalleryCategoriesByParamsDTO : ListActiveGalleryCategoryByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllActiveGalleryCategoriesByParams`, getAllActiveGalleryCategoriesByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getAllActiveGalleriesByParams = createAsyncThunk(
  "media/getAllActiveGalleriesByParams", 
  async (getAllActiveGalleriesByParamsDTO : ListActiveGalleryByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllActiveGalleriesByParams`, getAllActiveGalleriesByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getAllGalleryFilesByGalleryId = createAsyncThunk(
  "media/getAllGalleryFilesByGalleryId", 
  async (galleryId: string | number, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllGalleryFilesByGalleryId`, galleryId);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

interface MediaState extends IntialState {
  galleries: GalleryDTO[];
  galleryCategories: GalleryCategoryDTO[]
  galleryFiles: GalleryFileDTO[]
}

const initialState: MediaState = {
  galleries: [],
  galleryCategories: [],
  galleryFiles: [],
  isLoading: false,
  hasError: false,
  error: ''
}

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllActiveGalleryCategoriesByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllActiveGalleryCategoriesByParams.fulfilled, (state, { payload }) => {
            state.galleryCategories = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllActiveGalleryCategoriesByParams.rejected, (state, { payload }) => {
            state.galleryCategories = [];
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
          
          .addCase(getAllActiveGalleriesByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllActiveGalleriesByParams.fulfilled, (state, { payload }) => {
            state.galleries = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllActiveGalleriesByParams.rejected, (state, { payload }) => {
            state.galleries = [];
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getAllGalleryFilesByGalleryId.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllGalleryFilesByGalleryId.fulfilled, (state, { payload }) => {
            state.galleryFiles = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllGalleryFilesByGalleryId.rejected, (state, { payload }) => {
            state.galleryFiles = [];
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default mediaSlice.reducer;