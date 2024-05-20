import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllOrders, fetchOrders, fetchOrderById, fetchAllOrders } from '../../stores/orders/ordersSlice';
import '../Orders/orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  console.log(orders); 
  const userId = sessionStorage.getItem('UserId');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if(userId){
      dispatch(fetchOrderById(userId));
    }else{
      dispatch(fetchAllOrders());
    }
  }, [dispatch, userId]);

  const handleFilter = () => {
    if (startDate && endDate) {
      dispatch(fetchOrders({ startDate, endDate, id: userId }));
    }
  };
  
  return (
    <div className="bg-white">
      <div className="menu-wrapper">
        <div className="filterContainer">
          <div className="inputRow">
            <label htmlFor="startDate">Start Date:</label>
            <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="inputRow">
            <label htmlFor="endDate">End Date:</label>
            <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button className="filterButton" onClick={handleFilter} disabled={!startDate || !endDate}>Filter</button>
        </div>
        {((startDate && !endDate) || (!startDate && endDate)) && (
          <div className="errorMessageContainer">
            <div className="errorMessage" style={{ color: "red" }}>
            Please select both dates            
            </div>
          </div>
        )}
      </div>
      <div className="ordersContainer">
        {orders.status !== 'fulfilled' ? (
          <div className="loadingMessage">Loading...</div>
        ) : (
          Array.isArray(orders.orders) ? (
            orders.orders.length > 0 ? (
              <ul className="ordersList">
                {orders.orders.map((order) => (
                  <li key={order._id} className="orderItem">
                    <div className="order-info">
                      <div className="order-items">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="item">
                            <p className="item-name">{item.name}</p>
                            <p className="item-amount">Amount: {item.amount}</p>
                          </div>
                        ))}
                      </div>
                      <p>Total price: ${order.totalPrice.toFixed(2)}</p>
                      <p>Total amount: {order.totalAmount}</p>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="noOrdersMessage">No orders available</div>
            )
          ) : (
            <ul className="ordersList">
              <li key={orders.orders._id} className="orderItem">
                <div className="order-info">
                  <div className="order-items">
                    {orders.orders.orderItems.map((item, index) => (
                      <div key={index} className="item">
                        <p className="item-name">{item.name}</p>
                        <p className="item-amount">Amount: {item.amount}</p>
                      </div>
                    ))}
                  </div>
                  <p>Total price: ${orders.orders.totalPrice.toFixed(2)}</p>
                  <p>Total amount: {orders.orders.totalAmount}</p>
                  <p>{new Date(orders.orders.createdAt).toLocaleString()}</p>
                </div>
              </li>
            </ul>
          )
        )}
      </div>
    </div>
  );
}

export default Orders;