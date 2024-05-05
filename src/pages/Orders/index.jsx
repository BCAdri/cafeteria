import { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    /*useEffect(() => {
        fetchOrders();
    }, []);*/

    /*const fetchOrders = async () => {
        try {
            const response = await fetch("ruta-a-tu-api/orders");
            const data = await response.json();
            setOrders(data.orders); // Suponiendo que tu API devuelve los pedidos en un array llamado "orders"
        } catch (error) {
            console.error("Error al recuperar los pedidos:", error);
        }
    };*/

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {/* Aquí renderizas los detalles de cada pedido */}
                        <p>ID del Pedido: {order.id}</p>
                        <p>Fecha del Pedido: {order.date}</p>
                        {/* Otros detalles del pedido */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;