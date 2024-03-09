import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROOT_URL } from "../..";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunAPI) => {
    try {
      const res = await axios.get(`${ROOT_URL}/categories/all`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunAPI.rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer;
