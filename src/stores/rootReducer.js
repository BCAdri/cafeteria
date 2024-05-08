import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import productReducer from "./menu/productsSlice";
import orderReducer from "./orders/ordersSlice";
import categoriesSlice from "./menu/categoriesSlice";
const rootReducer = combineReducers(
    {
        cart: cartReducer,
        products: productReducer,
        orders: orderReducer,
        categories: categoriesSlice
    }
);

export default rootReducer;