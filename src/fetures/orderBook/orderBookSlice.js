import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderbookService from './orderbookService';

const initialState = {
  lastUpdateId: 0,
  bids: null,
  asks: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getSnapshot = createAsyncThunk('getSnapshot', async (thunkAPI) => {
  try {
    return await orderbookService.getSnapshot();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: { resetOrderbookState: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getSnapshot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSnapshot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lastUpdateId = action.payload.lastUpdateId;
        state.bids = action.payload.bids;
        state.asks = action.payload.asks;
      })

      .addCase(getSnapshot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrderbookState } = orderbookSlice.actions;
export default orderbookSlice.reducer;
