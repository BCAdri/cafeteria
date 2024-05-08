import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    error: null,
    status: 'idle',
};


export const orderSlice = createSlice({
  name: ' ',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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

    export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (startDate, endDate2, id) => {
        console.log();
        let url = `http://localhost:8000/api/filter-orders`;
        if (id !== undefined && id.trim() !== '') {
            url += `?id=${id}`;
        } 
        if (startDate !== undefined) {
            url += `${id ? '&' : '?'}startDate=${startDate}`;
        }
        /*if (endDate2 !== undefined) {
            url += `${id ||startDate ? '&' : '?'}endDate=${endDate2}`;
        }*/
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

  
  export const getOrderById = createAsyncThunk('orders/fetchOrders', async (id) => {
      
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
