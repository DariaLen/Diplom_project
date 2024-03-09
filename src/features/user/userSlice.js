import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    cart: [],
    isLoading: false,
  },

  reducers: {
    addItemToCart: (state, { payload }) => {
      const { id, quantity } = payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += quantity || 1;
      } else {
        state.cart.push({ ...payload, quantity: quantity || 1 });
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    incrementQuantity: (state, { payload }) => {
      const { id } = payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, { payload }) => {
      const { id } = payload;
      const itemIndex = state.cart.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        if (state.cart[itemIndex].quantity === 1) {
          state.cart.splice(itemIndex, 1);
        } else {
          state.cart[itemIndex].quantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    deleteProduct: (state, { payload }) => {
      const { id } = payload;
      state.cart = state.cart.filter((elem) => elem.id !== id);
    },
  },
});

export const {
  addItemToCart,
  updateCartItemQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  deleteProduct,
} = userSlice.actions;

export const selectTotalItemCount = (state) =>
  state.user.cart.reduce((total, item) => total + item.quantity, 0);

export default userSlice.reducer;
