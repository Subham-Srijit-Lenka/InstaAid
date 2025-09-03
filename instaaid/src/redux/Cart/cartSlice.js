import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQty: 0,
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.item.find((p) => p._id = id)

            if (existing) {
                existing.qty += 1;
            } else {
                state.items.push({ ...item, qty: 1 });
            }

            state.totalQty += 1;
            state.totalPrice += item.price;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const existing = state.items.find((p) => p._id === id);

            if (existing) {
                state.totalQty -= existing.qty;
                state.totalPrice -= existing.price * existing.qty;
                state.items = state.items.filter((p) => p._id !== id);
            }

            localStorage.setItem("cart", JSON.stringify(state));
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQty = 0;
            state.totalPrice = 0;
            localStorage.removeItem("cart");
        },

        loadCartFromStorage: (state) => {
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            if (savedCart) {
                state.items = savedCart.items;
                state.totalQty = savedCart.totalQty;
                state.totalPrice = savedCart.totalPrice;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, loadCartFromStorage } =
    cartSlice.actions;
export default cartSlice.reducer;
