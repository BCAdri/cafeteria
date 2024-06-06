import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllOrders, fetchOrders, fetchOrderById, fetchAllOrders, updateOrderStatus } from '../../stores/orders/ordersSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  
  const userId = localStorage.getItem('UserId');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPaid, setIsPaid] = useState('');

  useEffect(() => {
    if(userId){
      dispatch(fetchOrderById(userId));
    }else{
      dispatch(fetchAllOrders());
    }
  }, [dispatch, userId]);

  const handleFilter = () => {
    if ((startDate && endDate) || isPaid) {
      let filterIsPaid = isPaid;
      if (isPaid === 'all') {
        filterIsPaid = '';
      }
      dispatch(fetchOrders({ startDate, endDate, id: userId, isPaid: filterIsPaid }));
    }
  };

  const handleMarkAsPaid = (orderId) => {
    dispatch(updateOrderStatus({ id: orderId, isPaid: true }));
  };
  

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
    <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8">
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center">
            <label htmlFor="startDate" className="mr-2">Fecha inicio:</label>
            <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <label htmlFor="endDate" className="mr-2">Fecha fin:</label>
            <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <label htmlFor="isPaid" className="mr-2">Estado de pago:</label>
            <select id="isPaid" value={isPaid} onChange={(e) => setIsPaid(e.target.value)} className="border border-gray-300 rounded px-2 py-1">
              <option value="all">Todos</option>
              <option value="true">Pagado</option>
              <option value="false">No pagado</option>
            </select>
          </div>
          <button 
            className="bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700" 
            onClick={handleFilter} 
            disabled={(!startDate || !endDate) && !isPaid}
          >
            Filtrar
          </button>
        </div>
        {((startDate && !endDate) || (!startDate && endDate)) && (
          <div className="text-center mt-4">
            <p className="text-red-500">Selecciona ambas fechas</p>
          </div>
        )}
      </div>
        <div className="max-w-md mx-auto">
          {orders.status !== 'fulfilled' ? (
            <div className="loadingMessage text-center">Cargando...</div>
          ) : (
            Array.isArray(orders.orders) ? (
              orders.orders.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {orders.orders.map((order) => (
                    <div key={order._id} className="border border-black rounded p-4">
                      <div className="order-info">
                          <p>{new Date(order.createdAt).toLocaleString()}</p>
                        <div className="order-items">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="border border-gray-300 rounded p-2 mb-2">
                              <p className="font-semibold">{item.name}</p>
                              <p className="font-bold">{item.amount}</p>
                              <p className="font-bold">{item.price}€</p>
                            </div>
                          ))}
                        </div>
                        <p>Precio total: <span className="font-bold text-blue-500">{order.totalPrice.toFixed(2)}€</span></p>
                        <p>Cantidad: <span className="italic">{order.totalAmount}</span></p>
                  
                        {!order.isPaid ? (
                              <button 
                                className="bg-green-500 text-white rounded px-4 py-2 mt-2 hover:bg-green-700" 
                                onClick={() => handleMarkAsPaid(order._id)}
                              >
                                Marcar como pagado
                              </button>
                            ) : (
                              <span className="text-green-500 font-semibold">Pagado</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="noOrdersMessage text-center">No hay pedidos disponibles</div>
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
                    <p>Precio total: <span className="font-bold text-blue-500">${orders.orders.totalPrice.toFixed(2)}</span></p>
                    <p>Cantidad: <span className="italic">{orders.orders.totalAmount}</span></p>
                    <p>{new Date(orders.orders.createdAt).toLocaleString()}</p>
                    {!orders.isPaid ? (
                              <button 
                                className="bg-green-500 text-white rounded px-4 py-2 mt-2 hover:bg-green-700" 
                                onClick={() => handleMarkAsPaid()}
                              >
                                Marcar como pagado
                              </button>
                            ) : (
                              <span className="text-green-500 font-semibold">Pagado</span>
                        )}
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