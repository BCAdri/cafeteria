/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;

export const fetchOrders = () => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    const response = await fetch('/api/orders/get-orders');
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    dispatch(fetchOrdersSuccess(data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export const fetchOrdersById = (userId) => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    const response = await fetch(`/api/orders/get-orders/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    dispatch(fetchOrdersSuccess(data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    const response = await fetch('/api/orders/create-order', {
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
    dispatch(fetchOrdersSuccess(data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export const fetchOrdersByFilter = (startDate, endDate, id) => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    let url = `/api/orders/filter-orders`;
    if (id && id.trim() !== '') {
      url += `?id=${id}`;
    } else {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    dispatch(fetchOrdersSuccess(data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export default orderSlice.reducer;*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    loading: false,
    status: 'idle',
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({ startDate, endDate, id }, { dispatch }) => {
  console.log("entra");
  
  let url = `http://localhost:8000/api/get-orders`;
    /*if (id && id.trim() !== '') {
        url += `?id=${id}`;
    } 
    if (startDate || endDate) {
        url += `${id ? '&' : '?'}startDate=${startDate}&endDate=${endDate}`;
    }*/
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    console.log('data'+data);
    return data;
});

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {/*
        fetchOrdersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersSuccess(state, action) {
            state.loading = false;
            state.orders = action.payload;
        },
        fetchOrdersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },*/
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.orders = action.payload;
        });
        builder.addCase(fetchOrders.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        });
    },
});

export const { getOrders } = orderSlice.actions;

export const selectAllOrders = state => state.orders;

export default orderSlice.reducer; 