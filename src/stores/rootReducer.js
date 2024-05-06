import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import productReducer from "./menu/productsSlice";
import addressReducer from "./userInfo/addressSlice";
import orderReducer from "./orders/ordersSlice";

const rootReducer = combineReducers(
    {
        cart: cartReducer,
        products: productReducer,
        order: orderReducer
    }
);

export default rootReducer;