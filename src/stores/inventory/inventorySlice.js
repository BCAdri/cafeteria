import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});


export const addProduct = createAsyncThunk('products/addProduct', async () => {
    const response = await fetch('http://localhost:8000/api/addProduct')
    const data = await response.json()
    return data
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async () => {
    const response = await fetch('http://localhost:8000/api/deleteProduct')
    const data = await response.json()
    return data
})

export const addCategory = createAsyncThunk('products/addCategory', async () => {
    const response = await fetch('http://localhost:8000/api/addCategory')
    const data = await response.json()
    return data
})

export const deleteCategory = createAsyncThunk('products/deleteCategory', async () => {
    const response = await fetch('http://localhost:8000/api/deleteCategory')
    const data = await response.json()
    return data
})
export default inventorySlice.reducer;