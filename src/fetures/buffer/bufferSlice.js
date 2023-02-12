import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  buffer: [],
  u: null,
};

export const bufferSlice = createSlice({
  name: 'buffer',
  initialState,
  reducers: {
    resetBufferState: () => initialState,
    addToBuffer: (state, action) => {
      state.buffer = [...state.buffer, action.payload];
    },
    setFinalUpdateIDinEvent: (state, action) => {
      state.u = action.payload.u;
    },
    clearBuffer: (state) => {
      state.buffer = [];
    },
  },
});

export const {
  resetBufferState,
  addToBuffer,
  setFinalUpdateIDinEvent,
  clearBuffer,
} = bufferSlice.actions;
export default bufferSlice.reducer;
