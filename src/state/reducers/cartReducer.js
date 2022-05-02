import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    isLoading: false,
    error: null,
};

const { reducer: cartReducer, actions } = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state = initialState;
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload.product);
        },
        addToCartFailure: (state, action) => {
            state.isLoading = false;
            state.cart = [];
            state.error = action.payload;
        }
    }
});

export const addToCart = ({product}) => {
    return async (dispatch) => {
        try {
            dispatch(actions.addToCart({product}));
        } catch (err) {
            dispatch(actions.addToCartFailure(err?.response?.data?.message));
        }
    }
}

export const clearCart = () => {
    return async (dispatch) => {
        dispatch(actions.clearCart());
    }
}


export { cartReducer };