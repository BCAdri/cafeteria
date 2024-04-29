import simcafs from "../assets/img/simcafs.png";
import cartIcon from "../assets/img/simarro.jpg";
import cartIcon2 from "../assets/img/web.png";

import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <nav id="header" className="bg-black text-white">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="logo-wrapper pl-4 flex items-center">
                <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                <img src={cartIcon} alt="logo" className="w-20 h-20 object-cover"/>
                </Link>
                </div>

                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    <Link to="/" className="text-xl">Home</Link>
                    <Link to="#about" className="text-xl">About</Link>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <Link to="/cart">
                    <img src={cartIcon2} alt="cart" className="w-20 h-20 object-cover"/>  
                    </Link>
                    <Link to="/login" >Log in</Link>
                    <Link to="/register" >Sign up</Link>
                </div>
            </div>
        </nav>
    )
}