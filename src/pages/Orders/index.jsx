import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchOrdersByFilter, fetchOrdersById } from '../../stores/orders/ordersSlice';

const OrdersComponent = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const isAuthenticated = sessionStorage.getItem('User Id');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrdersById(isAuthenticated));
    } else {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated]);

  const handleFilter = () => {
    dispatch(fetchOrdersByFilter(startDate, endDate, isAuthenticated ));
  };

  return (
    
    <div style={styles.ordersContainer}>
      <h2>Orders</h2>
      <div style={styles.filterContainer}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleFilter}>Filter</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={styles.errorMessage}>Error: {error}</div>}
      <ul style={styles.ordersList}>
        {orders.map((order, index) => (
          <li key={index} style={styles.orderItem}>
            <p>ID del Pedido: {order.id}</p>
            <p>Fecha del Pedido: {order.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  ordersContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  filterContainer: {
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
  },
  ordersList: {
    listStyleType: 'none',
    padding: 0,
  },
  orderItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
  },
};

export default OrdersComponent;