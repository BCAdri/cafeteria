import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
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
    const response = await axios.get('/api/orders/get-orders');
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    const response = await axios.post('/api/orders/create-order', orderData);
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export const fetchOrdersByFilter = (startDate, endDate) => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    const response = await axios.get(`/api/orders/filter-orders?startDate=${startDate}&endDate=${endDate}`);
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export default orderSlice.reducer;