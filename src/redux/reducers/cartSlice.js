import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartRed: (state, action) => {
      state.cart = action.payload;
    },
    addToCartRed: (state, action) => {
      const item = action.payload;
      state.cart.push(item);
    },
    updateCartRed: (state, action) => {
      const item = action.payload;
      const index = state.cart.findIndex((i) => i.cartId == item.cartId);
      console.log(index);
      if (index >= 0) {
        state.cart[index] = item;
      }
    },
    removeFromCartRed: (state, action) => {
      state.cart = state.cart.filter((item) => item.cartId !== action.payload);
    },

    clearCart: (state) => {
      state.cart = [];  
    },

  },
});

export const { addToCartRed, updateCartRed, removeFromCartRed, fetchCartRed, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
