import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ROOT_URL } from "../..";

export const getSingleProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const res = await axios(`${ROOT_URL}/products/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const apiSlice = createSlice({
  name: "product",
  initialState: {
    details: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
      state.details = payload;
      state.isLoading = false;
    });
    builder.addCase(getSingleProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default apiSlice.reducer;
