import { useState } from "react";
import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/button";
import { useSelector } from "react-redux";
import { cartProducts } from "../../stores/cart/cartSlice";
import useTabSwitch from "../../hooks/useTabSwitch";
import { ReactComponent as ArrowRightSvg } from "../../assets/img/long-arrow-right-svgrepo-com.svg";
import { ProductsSummary } from "../../components/ProductSummary";
import PrintTicket from "../../components/PrintTicket";

const Cart = () => {
    const cart = useSelector(cartProducts);
    const tabs= ['Summary', 'Print'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');
    const [printEnabled, setPrintEnabled] = useState(false);

    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white h-full text-black flex justify-center p-4">
                <h1>Your Cart is empty</h1>
            </div>
        )
    }

    const handleNextButtonClick = () => {
        setPrintEnabled(true);
        handleTabSwitch('Print');
    };

    return (
        <div className="bg-white h-screen text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
            <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
            <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`} >
                <ProductsSummary />
                <div className="flex justify-end p-2">
                    <Button variant="dark" className="flex items-center" onClick={handleNextButtonClick}><span className="mr-1">Next</span><ArrowRightSvg className="w-4 h-4"/></Button>
                </div>
            </div>
            <div className={`tabs ${currentTab !== 'Print' || !printEnabled ? 'hidden' : ''}`}>
                <PrintTicket cart={cart} />
            </div>
        </div>
    )
}

export default Cart;