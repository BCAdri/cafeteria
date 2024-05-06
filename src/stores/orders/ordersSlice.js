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

export const fetchOrdersById = (userId) => async (dispatch) => {
    dispatch(fetchOrdersStart());
    try {
      const response = await axios.get(`/api/orders/get-orders/${userId}`);
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

export const fetchOrdersByFilter = (startDate, endDate, id) => async (dispatch) => {
    dispatch(fetchOrdersStart());
    try {
      let url = `/api/orders/filter-orders`;
      if (id && id.trim() !== '') {
        url += `?id=${id}`;
      } else {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axios.get(url);
      dispatch(fetchOrdersSuccess(response.data));
    } catch (error) {
      dispatch(fetchOrdersFailure(error.message));
    }
  };

export default orderSlice.reducer;