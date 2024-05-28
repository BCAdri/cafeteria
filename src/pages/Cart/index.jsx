import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/button";
import { useSelector,useDispatch } from "react-redux";
import { cartProducts, removeFromCart, clearCart, toggleOrderPaid   } from "../../stores/cart/cartSlice";
import useTabSwitch from "../../hooks/useTabSwitch";
import { ProductsSummary } from "../../components/ProductSummary";
import PrintTicket from "../../components/PrintTicket";
import SaveOrderButton from "../../components/SaveOrderButton";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(cartProducts);
    const tabs = ['Summary', 'Print'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');
    const isOrderPaid = useSelector((state) => state.cart.isPaid);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ id: productId }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };
    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white h-full text-black flex justify-center p-4">
                <h1>Tu carrito esta vacío</h1>
            </div>
        );
    }

    const handleMarkOrderAsPaid = () => {
        dispatch(toggleOrderPaid());
    };

    return (
        <div className="bg-white text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8 flex flex-col">
          <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
          <div className={`flex-1 ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
            <ProductsSummary cart={cart} onRemoveFromCart={handleRemoveFromCart} />
            <div className="flex justify-between p-2">
              <Button variant="dark" className="flex items-center me-2" onClick={handleClearCart}>
                Limpiar carrito
              </Button>
              <Button 
                  style={{ padding: '0.5rem 1rem'}} 
                  className={`flex items-center me-2 ${isOrderPaid ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`} 
                  onClick={handleMarkOrderAsPaid}
              >
                  {isOrderPaid ? 'Desmarcar Pagado' : 'Marcar como Pagado'}
              </Button>
              <SaveOrderButton cart={cart}  isOrderPaid={isOrderPaid} />
              <PrintTicket cart={cart} isOrderPaid={isOrderPaid}/>

            </div>
          </div>
        </div>
      );
}

export default Cart;