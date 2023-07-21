import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import axios from 'src/api/axios';
import { SliderItemDTO } from 'src/models/contentManagement/sliderItem/sliderItemDTO';
import { IntialState } from 'src/state/interfaces/intialState';
import { ListActiveSliderItemByParamsDTO } from 'src/models/contentManagement/sliderItem/listActiveSliderItemByParamsDTO';

const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/home`;

export const getAllActiveSlidersByParams = createAsyncThunk(
  "sliders/getAllActiveSlidersByParams", 
  async (listActiveSliderItemByParamsDTO : ListActiveSliderItemByParamsDTO, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/getAllActiveSlidersByParams`, listActiveSliderItemByParamsDTO);
      return data?.result;
    } catch (err) {
      const error= err as AxiosError;
      return rejectWithValue(error.message);
    }
});

interface SliderItemState extends IntialState {
  sliderItems: SliderItemDTO[] | null,
  sliderItem: SliderItemDTO | null
}

const initialState: SliderItemState = {
    sliderItems: null,
    sliderItem: null,
    isLoading: false,
    hasError: false,
    error: ''
}

const homeSlice = createSlice({
    name: 'sliderItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllActiveSlidersByParams.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
          .addCase(getAllActiveSlidersByParams.fulfilled, (state, { payload }) => {
            state.sliderItems = payload;
            state.isLoading = false;
            state.hasError = false;
          })
          .addCase(getAllActiveSlidersByParams.rejected, (state, { payload }) => {
            state.sliderItems = null;
            state.hasError = true;
            state.isLoading = false;
            state.error = <string>payload;
          })
    }
});

export default homeSlice.reducer;