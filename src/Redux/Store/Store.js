import {configureStore} from '@reduxjs/toolkit';
import dataReducer from '../Slices/dataSlice';
import cartReducer from '../Slices/cartSlices';
import orderReducer from '../Slices/orderSlice';
const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
export default store;
