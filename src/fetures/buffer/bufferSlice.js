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
      state.u = action.payload.u;
    },
    dropEvent: (state, action) => {
      state.buffer = state.buffer.filter((element) => {
        console.log(element.u, action.payload);
        console.log('drop any updates older than the snapshot');
        return element.u > action.payload;
      });
    },
  },
});

export const { resetBufferState, addToBuffer, dropEvent } = bufferSlice.actions;
export default bufferSlice.reducer;
