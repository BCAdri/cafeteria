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
                state.products[existingProductIndex].price = parseFloat(state.products[existingProductIndex].price) + parseFloat(action.payload.price);
                state.products[existingProductIndex].price = state.products[existingProductIndex].price.toFixed(2);
            } else {
                state.products.push({ ...action.payload, amount: 1, price: parseFloat(action.payload.price).toFixed(2) });
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload._id);
        },
        incrementProductAmount: (state, action) => {
            const product = state.products.find(product => product._id === action.payload._id);
            const precioIndividual =product.price / product.amount;
            if (product) {
                product.amount += 1;
                product.price = (parseFloat(product.price) + precioIndividual).toFixed(2);
            }
        },
        decrementProductAmount: (state, action) => {
            const product = state.products.find(product => product._id === action.payload._id);
            if (product) {
                if (product.price) {
                    const precioIndividual = product.price / product.amount;
                    product.amount -= 1;
                    product.price = (parseFloat(product.price) - precioIndividual).toFixed(2);
        
                    if (product.amount === 0) {
                        state.products = state.products.filter(product => product._id !== action.payload._id);
                    }
                } 
            }
        },
        clearCart: (state) => {
            state.products = [];
        },
        toggleOrderPaid: (state) => {
            state.isPaid = !state.isPaid;
        }
    }
});

export const cartProducts = state => state.cart.products

export const {  addToCart, clearCart, incrementProductAmount, decrementProductAmount, removeFromCart,toggleOrderPaid  } = cartSlice.actions

export default cartSlice.reducer