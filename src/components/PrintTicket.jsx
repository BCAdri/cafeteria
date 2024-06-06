import { useEffect, useState } from "react";

const PrintTicket = ({ cart, title = "Ticket de compra", footer = "SimCafs 2024", isOrderPaid }) => {
    const [printEnabled, setPrintEnabled] = useState(false);
    const currentDate = new Date().toLocaleString();

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

            printTicket();
            setPrintEnabled(false);
        }
    }, [printEnabled, cart]);

    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, product) => {
            console.log(typeof product.price, product.price);
            const price = parseFloat(product.price);
            return total + price;
        }, 0).toFixed(2);
    };

    const generatePrintContent = (cart) => {
        const totalPrice = calculateTotalPrice(cart);

        return `
        <html>
        <head>
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .ticket {
                    padding: 20px;
                    border: 1px solid #ccc;
                }
                .product {
                    margin-bottom: 10px;
                }
                .footer {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="ticket">
                <h1>${title}</h1>
                ${cart.map((product, index) => (
                    `<div class="product">
                        <p>${product.name} - ${product.price / product.amount}€ x ${product.amount}</p>
                    </div>`
                )).join('')}
                <div class="footer">
                    <p>Precio Total: ${totalPrice}€</p>
                    <p>Estado de Pago: ${isOrderPaid ? 'Pagado' : 'No Pagado'}</p>
                    <p>${footer} - ${currentDate}</p>
                </div>
            </div>
        </body>
        </html>
        `;
    };

    return (
        <div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPrintEnabled(true)}>Imprimir Ticket</button>
        </div>
    );
};

export default PrintTicket;