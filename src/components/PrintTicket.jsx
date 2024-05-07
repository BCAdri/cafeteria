import { useEffect, useState } from "react";

const PrintTicket = ({ cart, title = "Ticket de compra", footer = "SimCafs 2024"}) => {
    const [printEnabled, setPrintEnabled] = useState(false);

    const currentDate = new Date().toLocaleString();

    useEffect(() => {
        if (printEnabled) {
            const printTicket = () => {
                const printWindow = window.open('', '_blank');
                if (printWindow !== null) { // Verificar si printWindow no es null
                    const content = generatePrintContent(cart);
                    printWindow.document.write(content);
                    printWindow.document.close();
                    printWindow.print();
                    printWindow.close();
                }
            };
        
            printTicket();
            setPrintEnabled(false); // Reset printEnabled state after printing
        }
    }, [printEnabled, cart, title, footer]);   
 

    
    /*npm install react-to-print

    import ReactToPrint from "react-to-print";
    const PrintTicket = ({ cart, title = "Ticket de compra", footer = "SimCafs 2024" }) => {
    const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Print Ticket</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} style={{ display: "none" }}>
        <div className="ticket">
          <h1>{title}</h1>
          {cart.map((product, index) => (
            <div className="product" key={index}>
              <p>{product.name}: ${product.price}</p>
            </div>
          ))}
          <div className="footer">
            <p>{footer}</p>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
*/
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