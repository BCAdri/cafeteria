import simcafs from "../assets/img/cafeteria.png";
import cartIcon2 from "../assets/img/web.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import Button from "./elements/button";
import { useDispatch } from "react-redux";
import { clearCart  } from "../stores/cart/cartSlice";

export const Header = ({ cartCount }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            dispatch(clearCart());
            sessionStorage.removeItem('Auth token');
            sessionStorage.removeItem('UserId');
            window.dispatchEvent(new Event("storage"));
            navigate("/");
        })
        .catch((error) => {
            console.log("noentra");
            console.error('Error al cerrar sesión:', error);
        });
    }

    useEffect(() => {
        const checkAuthToken = () => {
            const token = sessionStorage.getItem('Auth token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        checkAuthToken();

        window.addEventListener('storage', checkAuthToken);

        return () => {
            window.removeEventListener('storage', checkAuthToken);
        }
    }, [])

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            sessionStorage.setItem('Reloaded', 'true');
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [])
    return (
        <nav id="header" className="bg-gray-800 text-white">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                        <img src={simcafs} style={{ width: '100px', height: '100px' }} alt="logo" className="w-40 h-40 object-cover"/>
                    </Link>
                </div>
                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    <Link to="/" className="text-xl">Home</Link>
                    <Link to="/menu" className="text-xl">Menu</Link>
                    <Link to="/orders" className="text-xl">Orders</Link>
                    <Link to="/inventory" className="text-xl">Inventory</Link>

                </div>
                <div className="flex items-center justify-center space-x-4">
                    <Link to="/cart" className="mr-4 relative">
                        <img src={cartIcon2} style={{ width: '40px', height: '40px' }} alt="cart" />
                        {cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">{cartCount}</div> : null}
                    </Link>
                    {
                        isLoggedIn ? 
                        <Button onClick={handleLogout}>Log Out</Button> : 
                        (
                            <>
                             <Link to="/login">Log In</Link>
                             <Link to="/register">Sign Up</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}