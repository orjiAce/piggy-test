import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addItemToCart} from "../../utils/functions";


export interface DataState {
    cartItems: any[],
    cart: any[],
}

const initialState: DataState = {
    cartItems: [],
    cart: [],
}

export const dataSlice = createSlice({
    name: 'appdata',
    initialState,
    reducers: {

        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

        },
        addItem: (state, action) => {
            const newCart = addItemToCart(state.cartItems, action.payload)
           state.cartItems.push(newCart)

        },
        addToCart: (state, action) => {
            const itemInCart = state?.cart?.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state?.cart?.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload);
            state.cart = removeItem;
        },
        cleanData: () => initialState

    },
})

// Action creators are generated for each case reducer function
export const {addItem,addToCart,decrementQuantity,incrementQuantity} = dataSlice.actions

export default dataSlice.reducer
