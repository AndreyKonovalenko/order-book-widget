import { configureStore } from "@reduxjs/toolkit";
import orderBookReducer from "./fetures/orderBook/orderBookSlice";
import closePriceSlice from "./fetures/closePrice/closePriceSlice";

export default configureStore({
  reducer: {
    orderBook: orderBookReducer,
    closePrice: closePriceSlice,
  },
});
