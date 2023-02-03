import { createSlice } from "@reduxjs/toolkit";
import { formatToCurrency } from "../../utils/utils";
const initialState = {
  closePrice: 0,
};

export const closePriceSlice = createSlice({
  name: "closePrice",
  initialState,
  reducers: {
    resetClosePriceState: () => initialState,
    setClosePrice: (state, action) => {
      state.closePrice = formatToCurrency(parseFloat(action.payload));
    },
  },
});

export const { resetClosePriceState, setClosePrice } = closePriceSlice.actions;
export default closePriceSlice.reducer;
