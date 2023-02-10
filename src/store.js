import { configureStore } from "@reduxjs/toolkit";
import orderBookReducer from "./fetures/orderBook/orderBookSlice";
import closePriceSlice from "./fetures/closePrice/closePriceSlice";
import bufferSlice from "./fetures/buffer/bufferSlice";

export default configureStore({
  reducer: {
    orderBook: orderBookReducer,
    closePrice: closePriceSlice,
    buffer: bufferSlice,
  },
});
