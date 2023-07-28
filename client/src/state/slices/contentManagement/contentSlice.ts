import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListAllMenuItemByParamsDTO } from 'src/models/contentManagement/menuItem/listAllMenuItemByParamsDTO';
import { ContentBlockDTO } from 'src/models/contentManagement/contentBlock/contentBlockDTO';
import { ContentBlockByParamsDTO } from 'src/models/contentManagement/contentBlock/contentBlockByParamsDTO';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/content`;

export const getContentBlockByParams = createAsyncThunk(
  "contents/getContentBlockByParams", 
  async (ContentBlockByParamsDTO : ContentBlockByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getContentBlockByParams`, ContentBlockByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

interface ContentState extends IntialState {
  contentBlocks: ContentBlockDTO[]
}

const initialState: ContentState = {
    contentBlocks: [],
    isLoading: false,
    hasError: false,
    error: ''
}

const contentSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getContentBlockByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getContentBlockByParams.fulfilled, (state, { payload }) => {
            state.contentBlocks = [...state.contentBlocks, payload];
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getContentBlockByParams.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default contentSlice.reducer;