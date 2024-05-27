
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Orders from "../pages/Orders";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/cartSlice";
import { Footer } from "../components/Footer";
import Inventory from "../pages/Inventory";
import { useState } from "react";

const Navigation = () => {
    const productsInCart = useSelector(cartProducts);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const isUserAuthenticated = () => {
        return isLoggedIn; 
    }

    return (
        <BrowserRouter>
            <Header cartCount={productsInCart ? productsInCart.length : 0} 
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
            userRole={userRole} setUserRole={setUserRole}/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {isUserAuthenticated() && <Route path="/home" element={<Home />} />}
                {isUserAuthenticated() && <Route path="/cart" element={<Cart />} />}
                {isUserAuthenticated() && <Route path="/orders" element={<Orders />} />}
                {isUserAuthenticated() && <Route path="/menu" element={<Menu />} />}
                {isUserAuthenticated() && userRole === 'admin' && <Route path="/inventory" element={<Inventory />} />}
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Navigation;
