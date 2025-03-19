import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadOrders = createAsyncThunk('orders/loadOrders', async () => {
  try {
    const keys = ['orders', 'totalAmount'];
    const result = await AsyncStorage.multiGet(keys);
    const data = Object.fromEntries(result);
    return {
      orderList: data.orders ? JSON.parse(data.orders) : [],
      totalAmount: data.totalAmount ? JSON.parse(data.totalAmount) : 0,
    };
  } catch (error) {
    console.error('Error retrieving multiple items:', error);
    return {orderList: [], totalAmount: 0};
  }
});

const generateOrderNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderList: [],
    totalAmount: 0,
  },
  reducers: {
    addOrder: (state, action) => {
      const {name, amount} = action.payload;
      state.orderList.push({
        orderNo: generateOrderNumber(),
        name: name,
        amount: amount,
        time: new Date().toLocaleString(),
      });
      state.totalAmount = state.totalAmount + amount;
      AsyncStorage.setItem('orders', JSON.stringify(state.orderList)).catch(
        console.error,
      );
      AsyncStorage.setItem(
        'totalAmount',
        JSON.stringify(state.totalAmount),
      ).catch(console.error);
    },
    // // clearOrders: state => {
    // //   state.orderList = [];
    // //    AsyncStorage.removeItem('orders').catch(console.error);
    //   AsyncStorage.removeItem('totalAmount').catch(console.error);
    // // },
  },
  extraReducers: builder => {
    builder.addCase(loadOrders.fulfilled, (state, action) => {
      state.orderList = action.payload.orderList;
      state.totalAmount = action.payload.totalAmount;
    });
  },
});

export const {addOrder, clearOrders} = orderSlice.actions;
export default orderSlice.reducer;
