// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { ROOT_URL } from '../..'

// export const apiSlice = createApi({

//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333'}),
//     tagTypes: ['Product'],
//     endpoints:( builder) => ({
//         getProducts: builder.query({
//             query: ({ id }) => `/products/${id}`,
//             providesTags: ['Product'],
//         })
//     })
// })

// export const { useGetProductsQuery } = apiSlice

// export default apiSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ROOT_URL } from "../..";

// thunk для получения одного продукта
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

//  Slice для управления состоянием одного продукта

//TODO
/**
 * refactor
 *
 * rename singleProductSlice
 *
 **/
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

// export const {} = apiSlice.actions; //?
export default apiSlice.reducer;
