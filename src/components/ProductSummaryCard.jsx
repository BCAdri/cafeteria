import { useDispatch } from "react-redux";
import {incrementProductAmount, decrementProductAmount } from "../stores/cart/cartSlice";
import simcafs from "../assets/img/cafeteria.png";

export const ProductsSummaryCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex p-1 sm:p-2 border-b border-b-gray-200 items-center">
            <div className="product-image mr-2 border border-gray-200 rounded-lg w-20 sm:w-24 flex-shrink-0">
                {product.image ? (
                    <img src={`data:image/png;base64,${product.image}`} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <img src={`${simcafs}`} alt="" className="w-full h-full object-cover rounded-lg" />
                )}
            </div>
            <div className="product-info flex-grow">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="product-price-qt flex flex-col items-end justify-center ml-2">
                <div className="price text-xl font-semibold">{`${product.price}€`}</div>
                <div className="quantity flex items-center">
                    <button 
                        className="p-1 bg-gray-300 hover:bg-gray-400 rounded" 
                        disabled={product.amount <= 0} 
                        onClick={() => dispatch(decrementProductAmount(product))}
                    >
                        -
                    </button>
                    <span className="p-1 mx-2">{product.amount}</span>
                    <button 
                        className="p-1 bg-gray-300 hover:bg-gray-400 rounded" 
                        onClick={() => dispatch(incrementProductAmount(product))}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};