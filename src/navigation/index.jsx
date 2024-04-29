import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Register from "../pages/Register";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/menu" element={<Menu />}/>
                <Route path="/cart" element={<Cart />}/>

            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;