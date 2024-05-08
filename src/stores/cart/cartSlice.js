import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProductIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (existingProductIndex !== -1) {              
                state.products[existingProductIndex].amount += 1;
                state.products[existingProductIndex].price = (parseFloat(state.products[existingProductIndex].price.replace('€', '')) + parseFloat(action.payload.price.replace('€', ''))).toFixed(2);
            } else {
                state.products.push({ ...action.payload, amount: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload._id);
        },
        incrementProductAmount: (state, action) => {
            const product = state.products.find(product => product._id === action.payload._id);
            const precioIndividual = parseFloat(product.price.replace('€', '')) / product.amount;
            if (product) {
                product.amount += 1;
                product.price = (parseFloat(product.price.replace('€', '')) + precioIndividual).toFixed(2);
            }
        },
        decrementProductAmount: (state, action) => {
            const product = state.products.find(product => product._id === action.payload._id);
            const precioIndividual = parseFloat(product.price.replace('€', '')) / product.amount;

            if (product) {
                product.amount -= 1;
                product.price = (parseFloat(product.price.replace('€', '')) - precioIndividual).toFixed(2);
                if (product.amount === 0) {
                    state.products = state.products.filter(product => product._id !== action.payload._id);
                }
            }
        },
        clearCart: (state) => {
            state.products = [];
        }
    }
});

export const cartProducts = state => state.cart.products

export const {  addToCart, clearCart, incrementProductAmount, decrementProductAmount, removeFromCart } = cartSlice.actions

export default cartSlice.reducer