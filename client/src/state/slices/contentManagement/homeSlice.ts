import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { SliderItemDTO } from 'src/models/contentManagement/sliderItem/sliderItemDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListActiveSliderItemByParamsDTO } from 'src/models/contentManagement/sliderItem/listActiveSliderItemByParamsDTO';
import { ListAllMenuItemByParamsDTO } from 'src/models/contentManagement/menuItem/listAllMenuItemByParamsDTO';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/home`;

export const getAllActiveSlidersByParams = createAsyncThunk(
  "home/getAllActiveSlidersByParams", 
  async (listActiveSliderItemByParamsDTO : ListActiveSliderItemByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllActiveSlidersByParams`, listActiveSliderItemByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

export const getAllMenuItemsByParams = createAsyncThunk(
  "home/getAllMenuItemsByParams", 
  async (getAllMenuItemsByParamsDTO : ListAllMenuItemByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllMenuItemsByParams`, getAllMenuItemsByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

interface SliderItemState extends IntialState {
  sliderItems: SliderItemDTO[];
  menuItems: SliderItemDTO[] | null
}

const initialState: SliderItemState = {
    sliderItems: [],
    menuItems: [],
    isLoading: false,
    hasError: false,
    error: ''
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllMenuItemsByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllMenuItemsByParams.fulfilled, (state, { payload }) => {
            state.menuItems = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllMenuItemsByParams.rejected, (state, { payload }) => {
            state.menuItems = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })

          .addCase(getAllActiveSlidersByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllActiveSlidersByParams.fulfilled, (state, { payload }) => {
            const sliderItemList = state.sliderItems.filter(p => !payload?.map((j: any) => j.id)?.includes(p.id));
            state.sliderItems = [...sliderItemList, ...payload];
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllActiveSlidersByParams.rejected, (state, { payload }) => {
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default homeSlice.reducer;