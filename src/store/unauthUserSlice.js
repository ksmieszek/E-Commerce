import { createSlice } from "@reduxjs/toolkit";

export const unauthUserSlice = createSlice({
  name: "unauthUser",
  initialState: {
    cart: [],
    orderPersData: {},
    viewedProducts: [],
  },
  reducers: {
    unauthAddToCart: (state, { payload }) => {
      const { id, size, quantity } = payload;
      const productIndexInCart = state.cart.findIndex((item) => item.id === id && item.size === size);
      if (productIndexInCart !== -1) {
        state.cart[productIndexInCart].quantity += parseInt(quantity);
      } else {
        const idCartProduct = Date.now();
        const newProduct = { idCartProduct, id, size, quantity: parseInt(quantity) };
        state.cart = [...state.cart, newProduct];
      }
    },
    unauthIncreaseQuantity: (state, { payload }) => {
      const productIndexInCart = state.cart.findIndex((item) => item.idCartProduct === payload);
      state.cart[productIndexInCart].quantity += 1;
    },
    unauthDecreaseQuantity: (state, { payload }) => {
      const productIndex = state.cart.findIndex((item) => item.idCartProduct === payload);
      if (state.cart[productIndex].quantity === 1) unauthUserSlice.caseReducers.unauthDeleteFromCart(state, { payload });
      else state.cart[productIndex].quantity -= 1;
    },
    unauthDeleteFromCart: (state, { payload }) => {
      state.cart = [...state.cart.filter((item) => item.idCartProduct !== payload)];
    },
    saveUnauthPersOrderData: (state, { payload }) => {
      state.orderPersData = payload;
    },
    unauthResetCart: (state, { payload }) => {
      state.cart = [];
    },
    updateViewedProducts: (state, { payload }) => {
      state.viewedProducts = payload;
    },
  },
});

export const {
  unauthAddToCart,
  unauthIncreaseQuantity,
  unauthDecreaseQuantity,
  unauthDeleteFromCart,
  saveUnauthPersOrderData,
  unauthResetCart,
  updateViewedProducts,
} = unauthUserSlice.actions;

export default unauthUserSlice.reducer;
