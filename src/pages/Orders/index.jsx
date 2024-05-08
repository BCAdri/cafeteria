import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllOrders, fetchOrders, getOrderById, getAllOrders  } from '../../stores/orders/ordersSlice';
import '../Orders/orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders); 
  const userId = sessionStorage.getItem('UserId');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if(userId){
      dispatch(getOrderById(userId));
    }else{
      dispatch(fetchOrders());
    }
  }, [dispatch, userId]);

  const handleFilter = () => {
    dispatch(fetchOrders(startDate, endDate, userId));
  };
  
  return (
    <div className="bg-white">
      {orders.status !== 'fulfilled' ? (
        <div>Loading...</div>
      ) : (
        <div className="menu-wrapper">
          {orders.orders && orders.orders.length > 0 ? (
            <div className='ordersContainer'>
              <h2>Orders</h2>
              <div className="filterContainer">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleFilter}>Filter</button>
              </div>
              <ul className="ordersList">
                {orders.orders.map((order) => (
                  <li key={order._id} className="orderItem">
                    <div className="order-info">
                      <p>Total price: ${order.totalPrice.toFixed(2)}</p>
                      <p>Total amount: {order.totalAmount}</p>
                      <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="order-items">
                      {Object.entries(order.orderItems).map(([itemName, itemDetails]) => (
                        <div key={itemName} className="item">
                          <p className="item-name">{itemDetails.name}</p>
                          <p className="item-description">{itemDetails.description}</p>
                          <p className="item-amount">Amount: {itemDetails.amount}</p>
                          <p>Total price: {order.totalPrice && typeof order.totalPrice === 'number' ? `$${order.totalPrice.toFixed(2)}` : 'N/A'}</p>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No orders available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;