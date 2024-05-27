import { useEffect,useState  } from "react";
import { createOrder } from '../stores/orders/ordersSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaveOrderButton = ({ cart }) => {
  const dispatch = useDispatch();
  const [orderSaved, setOrderSaved] = useState(false);

  const userId = sessionStorage.getItem("UserId");

  const calculateOrderAmount = (orderItems) => {
    const initialValue = 0;
    const totalAmount = orderItems.reduce((previousValue, currentValue) => previousValue + currentValue.amount, initialValue); 
    return totalAmount;
}

const calculateOrderPrice = (orderItems) => {
    console.log(orderItems)
  const initialValue = 0;
  const itemsPrice = orderItems.reduce((previousValue, currentValue) => {
    const price = parseFloat(currentValue.price.replace('€', '').replace(',', '.'));
    return previousValue + price;
}, initialValue); 
console.log(itemsPrice)

  return itemsPrice;
}

useEffect(() => {
    if (orderSaved) {
      if (cart.length > 0) {
        const totalAmount = calculateOrderAmount(cart);
        const totalPrice = calculateOrderPrice(cart);

        const simplifiedOrderItems = cart.map(item => ({
          amount: item.amount,
          description: item.description,
          name: item.name,
          price: item.price,
        }));

        let orderData = {
          orderItems: simplifiedOrderItems,
          totalPrice: totalPrice,
          totalAmount: totalAmount 
        };

        if (userId) {
          orderData.sessionId = userId; 
        }
        dispatch(createOrder(orderData));
        toast.success("Order saved successfully!");
        setOrderSaved(false); 
      }
    }
  }, [orderSaved]);

  const handleSaveOrder = () => {
    setOrderSaved(true); 
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveOrder}>Save Order</button>
      <ToastContainer />
    </div>
  );
};

export default SaveOrderButton;