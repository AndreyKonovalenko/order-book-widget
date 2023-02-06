import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderBookService from './orderBookService';

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
  name: 'orderbook',
  initialState,
  reducers: {
    resetOrderBookState: () => initialState,
    processUpdate: (state, action) => {
      console.log(action.payload);
      state.lastUpdateId = action.payload.u;
    },
  },
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

export const { resetOrderBookState, processUpdate } = orderBookSlice.actions;
export default orderBookSlice.reducer;

// // update logic
//  state.quiz.questions.map((element) => {
//     if (element._id === action.payload._id) {
//       element = action.payload;
//     }
//     return element;
//   }),
// };

// // delete logic
// state.quiz.questions = state.quiz.questions.filter(
//   (element) => element._id !== action.payload.id
// );
