import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ROOT_URL } from "../..";

export const getCategoryProducts = createAsyncThunk(
  "categories/getCategoryProducts",
  async (categoryId, thunkAPI) => {
    try {
      const res = await axios.get(`${ROOT_URL}/categories/${categoryId}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice для хранения списка товаров в категории.
const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState: {
    list: {
      category: null,
      data: null,
    },
    filters: {
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
    builder.addCase(getCategoryProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase( getCategoryProducts.fulfilled, ( state, {payload} ) => {
      console.log(`categoryProducts/categoryProductsSlice.js - line: 49 ->> payload`, payload)
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategoryProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectFilteredProductsByCategory = (state) => {
  console.log(
    `categoryProducts/categoryProductsSlice.js - line: 64 ->> state.categoryProducts`,
    state.categoryProducts
  );

  const { list, filters, sorting, isLoading } = state.categoryProducts;

  const { category, data } = list;

  let filteredProducts = [...(data || [])].sort((a, b) => {
    const priceA = a.discont_price !== null ? a.discont_price : a.price;
    const priceB = b.discont_price !== null ? b.discont_price : b.price;
    return priceA - priceB;
  });

  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) =>
      Boolean(product.discont_price)
    );
    console.log("Filtered by category:", filteredProducts);
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

    console.log("Filtered by price range:", filteredProducts);
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

  return {
    category,
    list: filteredProducts,
    isLoading,
  };
};

export const {
  // setSearchFilter,
  // toggleCategoryFilter,
  setCategoryFilters,
  setPriceRangeFilter,
  setSorting,
  // getRelatedProducts,
} = categoryProductsSlice.actions;

export default categoryProductsSlice.reducer;
