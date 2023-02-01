import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './fetures/orderBook/orderBookSlice';

export default configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
});
