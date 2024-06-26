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
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            const updatedOrder = action.payload;
            const existingOrder = state.orders.find(order => order._id === updatedOrder._id);
            if (existingOrder) {
              existingOrder.isPaid = updatedOrder.isPaid;
            }
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
        return data;
    });

    export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({ startDate, endDate, id, isPaid }) => {
        let url = `http://localhost:8000/api/filter-orders`;
        const params = new URLSearchParams();
        if (id) params.append('id', id);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (isPaid !== '') params.append('isPaid', isPaid);
      
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return await response.json();
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
      return data;
  });

  export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ id, isPaid }) => {
    const url = `http://localhost:8000/api/orders/updateOrderStatus/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPaid }),
    });
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    const data = await response.json();
    return data;
  });
  
  
export const selectAllOrders = state => state.orders;
