import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllOrders, fetchOrders, fetchOrderById, fetchAllOrders } from '../../stores/orders/ordersSlice';
const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  
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
    <div className="bg-white flex justify-center items-center">
      <div className="max-w-4xl mx-auto p-8">
        <div className="menu-wrapper">
          <div className="filterContainer mb-10 flex flex-col md:flex-row items-center justify-center"> 
            <div className="inputRow mb-4 md:mb-0 md:mr-4 flex items-center"> 
              <label htmlFor="startDate" className="block mb-1 mr-2">Start Date:</label> 
              <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded px-2 py-1" /> 
            </div>
            <div className="inputRow flex items-center">
              <label htmlFor="endDate" className="block mb-1 mr-2">End Date:</label>
              <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded px-2 py-1" /> 
            </div>
            <button className="filterButton bg-blue-500 text-white rounded px-4 py-2 text-lg font-semibold hover:bg-blue-700 ml-2" onClick={handleFilter} disabled={!startDate || !endDate}>Filter</button> 
          </div>
          {((startDate && !endDate) || (!startDate && endDate)) && (
            <div className="errorMessageContainer text-center mb-4">
              <div className="errorMessage text-red-500">
                Please select both dates            
              </div>
            </div>
          )}
        </div>
        <div className="max-w-md mx-auto">
          {orders.status !== 'fulfilled' ? (
            <div className="loadingMessage text-center">Loading...</div>
          ) : (
            Array.isArray(orders.orders) ? (
              orders.orders.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {orders.orders.map((order) => (
                    <div key={order._id} className="border border-black rounded p-4">
                      <div className="order-info">
                        <div className="order-items">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="border border-gray-300 rounded p-2 mb-2">
                              <p className="font-semibold">{item.name}</p>
                              <p className="font-bold">{item.amount}</p>
                            </div>
                          ))}
                        </div>
                        <p>Total price: <span className="font-bold text-blue-500">${order.totalPrice.toFixed(2)}</span></p>
                        <p>Total amount: <span className="italic">{order.totalAmount}</span></p>
                        <p>{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="noOrdersMessage text-center">No orders available</div>
              )
            ) : (
              <ul className="list-none">
                <li key={orders.orders._id} className="border border-black rounded mb-4 p-4">
                  <div className="order-info">
                    <div className="order-items">
                      {orders.orders.orderItems.map((item, index) => (
                        <div key={index} className="border border-gray-300 rounded p-2 mb-2">
                          <p className="font-semibold">{item.name}</p>
                          <p className="font-bold">{item.amount}</p>
                        </div>
                      ))}
                    </div>
                    <p>Total price: <span className="font-bold text-blue-500">${orders.orders.totalPrice.toFixed(2)}</span></p>
                    <p>Total amount: <span className="italic">{orders.orders.totalAmount}</span></p>
                    <p>{new Date(orders.orders.createdAt).toLocaleString()}</p>
                  </div>
                </li>
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;