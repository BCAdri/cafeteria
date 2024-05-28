import { useEffect,useState  } from "react";
import { createOrder } from '../stores/orders/ordersSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SaveOrderButton = ({ cart, isOrderPaid }) => {
  const dispatch = useDispatch();
  const [orderSaved, setOrderSaved] = useState(false);

  const userId = localStorage.getItem("UserId");

  const calculateOrderAmount = (orderItems) => {
      const initialValue = 0;
      const totalAmount = orderItems.reduce((previousValue, currentValue) => previousValue + currentValue.amount, initialValue); 
      return totalAmount;
  }

  const calculateOrderPrice = (orderItems) => {
      const initialValue = 0;
      const itemsPrice = orderItems.reduce((previousValue, currentValue) => {
          const price = currentValue.price;
          return previousValue + price;
      }, initialValue);

      return itemsPrice;
  }

  useEffect(() => {
      if (orderSaved) {
          if (cart.length > 0) {
              const totalAmount = calculateOrderAmount(cart);
              const totalPrice = calculateOrderPrice(cart);
            console.log(cart);
              const simplifiedOrderItems = cart.map(item => ({
                  amount: item.amount,
                  description: item.description,
                  name: item.name,
                  price: item.price,
              }));

              let orderData = {
                  orderItems: simplifiedOrderItems,
                  totalPrice: totalPrice,
                  totalAmount: totalAmount,
                  isPaid: isOrderPaid
              };

              if (userId) {
                  orderData.sessionId = userId;
              }
              dispatch(createOrder(orderData));
              toast.success("Pedido guardado correctamente!");
              setOrderSaved(false);
          }
      }
  }, [orderSaved]);

  const handleSaveOrder = () => {
      setOrderSaved(true);
  };

  return (
      <div className="flex items-center justify-center mt-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveOrder}>Guardar pedido</button>
          <ToastContainer />
      </div>
  );
};

export default SaveOrderButton;