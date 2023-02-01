import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderBookService from './orderBookService';

const initialState = {
  snapshot: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  rawBids: [],
  rawAsks: [],
};

export const getSnapshot = createAsyncThunk('getSnapshot', async (thunkAPI) => {
  try {
    return await orderBookService.getSnapshot();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: { resetOrderBookState: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getSnapshot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSnapshot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.snapshot = action.payload;
      })
      .addCase(getSnapshot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.snapshot = {};
      });
  },
});
export default orderBookSlice.reducer;
