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
      const currentCartState = JSON.parse(JSON.stringify(state.cart));
      const alreadyInCart = currentCartState.find((item) => item.id === id && item.size === size);
      if (alreadyInCart) {
        state.cart = [
          ...currentCartState.map((item) => {
            if (item.idCartProduct === alreadyInCart.idCartProduct) item.quantity = parseInt(item.quantity) + parseInt(quantity);
            return item;
          }),
        ];
      } else {
        const idCartProduct = Date.now();
        const newProduct = { idCartProduct, id, size, quantity: parseInt(quantity) };
        state.cart = [...state.cart, newProduct];
      }
    },
    unauthIncreaseQuantity: (state, { payload }) => {
      const currentCartState = JSON.parse(JSON.stringify(state.cart));
      state.cart = [
        ...currentCartState.map((item) => {
          if (item.idCartProduct === payload) item.quantity = parseInt(item.quantity) + 1;
          return item;
        }),
      ];
    },
    unauthDecreaseQuantity: (state, { payload }) => {
      const currentCartState = JSON.parse(JSON.stringify(state.cart));
      const product = currentCartState.find((item) => item.idCartProduct === payload);
      if (product.quantity === 1) {
        unauthUserSlice.caseReducers.unauthDeleteFromCart(state, { payload });
      } else {
        state.cart = [
          ...currentCartState.map((item) => {
            if (item.idCartProduct === payload) item.quantity = parseInt(item.quantity) - 1;
            return item;
          }),
        ];
      }
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
