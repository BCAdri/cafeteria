import simcafs from "../assets/img/cafeteria.png";
import cartIcon2 from "../assets/img/web.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';
import Button from "./elements/button";
import { useDispatch } from "react-redux";
import { clearCart  } from "../stores/cart/cartSlice";

export const Header = ({ cartCount, isLoggedIn, setIsLoggedIn, userRole, setUserRole}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            dispatch(clearCart());
            sessionStorage.removeItem('Auth token');
            sessionStorage.removeItem('UserId');
            sessionStorage.removeItem('UserRole');
            setIsLoggedIn(false);
            setUserRole(null);
            window.dispatchEvent(new Event("storage"));
            navigate("/login");
        })
        .catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
    }
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
        if (user) {
            setIsLoggedIn(true);
            const role = sessionStorage.getItem('UserRole');
            setUserRole(role);
        } else {
            setIsLoggedIn(false);
            setUserRole(null);
        }
    });

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
                    <Link className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                        <img src={simcafs} style={{ width: '100px', height: '100px' }} alt="logo" className="w-40 h-40 object-cover"/>
                    </Link>
                </div>
                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    {isLoggedIn && <Link to="/home" className="text-xl" activeClassName="text-white">Home</Link>}
                    {isLoggedIn && <Link to="/menu" className="text-xl" activeClassName="text-white">Menu</Link>}
                    {isLoggedIn && <Link to="/orders" className="text-xl" activeClassName="text-white">Orders</Link>}
                    {userRole === 'admin' && isLoggedIn && <Link to="/inventory" className="text-xl" activeClassName="text-white">Inventory</Link>}
                </div>
                <div className="flex items-center justify-center space-x-4">
                    {isLoggedIn && <Link to="/cart" className="mr-4 relative inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        {cartCount > 0 && (
                            <div className="absolute top-0 right-0 bg-yellow-400 text-white w-5 h-5 rounded-full flex justify-center items-center -mt-1 -mr-1">
                                {cartCount}
                            </div>
                        )}
                    </Link>}
                    {isLoggedIn ? 
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