import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  cartList: [],
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const {id, name, price, pic} = action.payload;
      const exisistingItem = state.cartList.find(item => item.id === id);
      if (exisistingItem) {
        exisistingItem.quantity += 1;
        exisistingItem.price += price;
      } else {
        state.cartList.push({id, name, price, pic, quantity: 1});
      }
      state.totalPrice = parseFloat((state.totalPrice + price).toFixed(2));
    },
    addQuantity: (state, action) => {
      const {itemId} = action.payload;
      const item = state.cartList.find(item => item.id === itemId);
      if (item) {
        const itemPrice = item.price / item.quantity;
        item.quantity += 1;
        item.price = parseFloat((item.price + itemPrice).toFixed(2));
        state.totalPrice = parseFloat(
          (state.totalPrice + itemPrice).toFixed(2),
        );
      } else {
        return null;
      }
    },
    removeQuantity: (state, action) => {
      const {itemId} = action.payload;
      const item = state.cartList.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        const itemPrice = item.price / item.quantity;
        item.quantity -= 1;
        item.price = parseFloat((item.price - itemPrice).toFixed(2));
        state.totalPrice = parseFloat(
          (state.totalPrice - itemPrice).toFixed(2),
        );
      } else {
        state.cartList = state.cartList.filter(item => item.id !== itemId);
      }
    },
    deleteItem: (state, action) => {
      const {id} = action.payload;
      const item = state.cartList.find(item => item.id === id);

      if (item) {
        const itemPrice = item.price / item.quantity;
        state.totalPrice = parseFloat(
          (state.totalPrice -= itemPrice).toFixed(2),
        );
        state.cartList = state.cartList.filter(item => item.id !== id);
      }
    },
  },
});
export const {addItem, addQuantity, removeQuantity, deleteItem} =
  cartSlice.actions;
export default cartSlice.reducer;
