import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  buffer: [],
};

export const bufferSlice = createSlice({
  name: 'buffer',
  initialState,
  reducers: {
    resetBufferState: () => initialState,
    addToBuffer: (state, action) => {
      state.buffer = [...state.buffer, action.payload];
    },
    dropEvent: (state, action) => {
      state.buffer = state.buffer.filter((element) => {
        console.log('drop any updates older than the snapshot');
        return element.u > action.payload.lastUpdateId;
      });
    },
  },
});

export const { resetBufferState, addToBuffer, dropEvent } = bufferSlice.actions;
export default bufferSlice.reducer;
