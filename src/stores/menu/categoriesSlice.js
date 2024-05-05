import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    error: null,
    status: 'idle',
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.categories = [...action.payload.data]
        });
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.status = 'pending'
        })
    }
})

export default categoriesSlice.reducer

export const { getCategories } = categoriesSlice.actions

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await fetch('http://localhost:8000/api/categories')
    const data = await response.json()
    return data
})

export const selectAllCategories = state => state.categories