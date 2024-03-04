import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROOT_URL } from "../..";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunAPI) => {
    try {
      const res = await axios(`${ROOT_URL}/products/all`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunAPI.rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "categories", // change to products???
  initialState: {
    list: [],
    filters: {
      // search: "",
      priceRange: { min: null, max: Infinity },
      category: false, // discount category
    },
    sorting: "default",
    isLoading: false,
  },
  reducers: {
    setPriceRangeFilter: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setCategoryFilters: (state, action) => {
      state.filters.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectFilteredProducts = (state) => {
  const { list, filters, sorting } = state.products;

  let filteredProducts = [...list].sort((a, b) => {
    const priceA = a.discont_price !== null ? a.discont_price : a.price;
    const priceB = b.discont_price !== null ? b.discont_price : b.price;
    return priceA - priceB;
  });

  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) =>
      Boolean(product.discont_price)
    );
  }

  if (
    (filters.priceRange && filters.priceRange.min !== null) ||
    filters.priceRange.max !== null
  ) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );
  }

  if (sorting === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  } else if (sorting === "price-high-low") {
    filteredProducts.sort((a, b) => {
      const priceA = a.discont_price !== null ? a.discont_price : a.price;
      const priceB = b.discont_price !== null ? b.discont_price : b.price;
      return priceB - priceA;
    });
  } else if (sorting === "price-low-high") {
    filteredProducts.sort((a, b) => {
      const priceA = a.discont_price !== null ? a.discont_price : a.price;
      const priceB = b.discont_price !== null ? b.discont_price : b.price;
      return priceA - priceB;
    });
  }

  return filteredProducts;
};

export const {
  // setSearchFilter,
  // toggleCategoryFilter,
  setCategoryFilters,
  setPriceRangeFilter,
  setSorting,
  // getRelatedProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
