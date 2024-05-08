import { useEffect, useState } from "react";
import { createOrder   } from '../stores/orders/ordersSlice';
import { useDispatch } from 'react-redux';

const PrintTicket = ({ cart, title = "Ticket de compra", footer = "SimCafs 2024"}) => {
    const [printEnabled, setPrintEnabled] = useState(false);
    const dispatch = useDispatch();
    const currentDate = new Date().toLocaleString();
    
    const userId = sessionStorage.getItem("UserId");
    
    const calculateOrderAmount = (orderItems) => {
      const initialValue = 0;
      const totalAmount = orderItems.reduce((previousValue, currentValue) => previousValue + currentValue.amount, initialValue); 
      return totalAmount;
  }

  const calculateOrderPrice = (orderItems) => {
    const initialValue = 0;
    const itemsPrice = orderItems.reduce((previousValue, currentValue) => {
      const price = parseFloat(currentValue.price.replace('€', '').replace(',', '.'));
      return previousValue + price * currentValue.amount;
  }, initialValue); 
    return itemsPrice;
  }

    useEffect(() => {
        if (printEnabled) {
            const printTicket = () => {
                const printWindow = window.open('', '_blank');
                if (printWindow !== null) { 
                    const content = generatePrintContent(cart);
                    printWindow.document.write(content);
                    printWindow.document.close();
                    printWindow.print();
                    printWindow.close();
                }
            };
            const totalAmount = calculateOrderAmount(cart);
            const totalPrice = calculateOrderPrice(cart);
            const simplifiedOrderItems = cart.map(item => ({
              amount: item.amount,
              description: item.desciption,
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
            printTicket();
            setPrintEnabled(false);
        }
    }, [printEnabled]);
 
const generatePrintContent = (cart) => {
  return `
  <html>
  <head>
      <title>Ticket de compra</title>
      <style>
          /* Estilos CSS para el contenido del ticket */
          /* Puedes personalizar los estilos según tus necesidades */
          body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh; /* Para centrar verticalmente en la página */
          }
          .ticket {
              padding: 20px;
              border: 1px solid #ccc;
          }
          .product {
              margin-bottom: 10px;
          }
          .footer {
              margin-top: 20px; /* Espacio adicional en la parte inferior */
          }
      </style>
  </head>
  <body>
      <div class="ticket">
          <h1>Ticket de compra</h1>
          ${cart.map((product, index) => (
              `<div class="product">
                  <p>${product.name}: $${product.price}</p>
              </div>`
          )).join('')}
          <div class="footer">
              <p>SimCafs 2024 - ${currentDate}</p>
          </div>
      </div>
  </body>
  </html>
      `;
};

return (
  <div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPrintEnabled(true)}>Print Ticket</button>
  </div>
);
};

export default PrintTicket;