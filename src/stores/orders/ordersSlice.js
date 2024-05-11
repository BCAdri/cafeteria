import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    error: null,
    status: 'idle',
};


export const orderSlice = createSlice({
  name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.orders = action.payload
        });
        builder.addCase(fetchAllOrders.pending, (state, action) => {

            state.status = 'pending';
        });
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        });
        builder.addCase(fetchOrderById.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.orders = action.payload
        });
        builder.addCase(fetchOrderById.pending, (state, action) => {

            state.status = 'pending';
        });
        builder.addCase(fetchOrderById.rejected, (state, action) => {

            state.status = 'rejected';
            state.error = action.error.message;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.orders = action.payload
        });
        builder.addCase(fetchOrders.pending, (state, action) => {

            state.status = 'pending';
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {

            state.status = 'rejected';
            state.error = action.error.message;
        });
      },
    });
    
    export const { getOrders } = orderSlice.actions;

    export default orderSlice.reducer; 

    export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async () => {

        let url = `http://localhost:8000/api/get-orders`;
    
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log(data);
        return data;
    });

    export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({ startDate = undefined, endDate = undefined, id = undefined }) => {

        let url = `http://localhost:8000/api/filter-orders`;
        if (id !== undefined && id !== '' && id != null) {
            url += `?id=${id}`;
        }

        if (startDate !== undefined && startDate !== '') {
            url += `${url.includes('?') ? '&' : '?'}startDate=${startDate}`;
        }

        if (endDate !== undefined && endDate !== '') {
            url += `${url.includes('?') || startDate.trim() !== '' ? '&' : '?'}endDate=${endDate}`;
        }
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log(data);
        return data;
    });

    export const createOrder = createAsyncThunk('orders/createOrder', async (orderData) => {
      try {
          const response = await fetch('http://localhost:8000/api/create-order', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(orderData),
          });
          if (!response.ok) {
              throw new Error('Failed to create order');
          }
          const data = await response.json();
          return data;
      } catch (error) {
          throw new Error(error.message);
      }
  });

  
  export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (id) => {
      
    let url = `http://localhost:8000/api/get-order/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      console.log(data);
      return data;
  });
export const selectAllOrders = state => state.orders;
