import { configureStore } from "@reduxjs/toolkit";
import orderbookReducer from "./fetures/orderbook/orderbookSlice";
import closePriceSlice from "./fetures/closePrice/closePriceSlice";

export default configureStore({
  reducer: {
    orderbook: orderbookReducer,
    closePrice: closePriceSlice,
  },
});
