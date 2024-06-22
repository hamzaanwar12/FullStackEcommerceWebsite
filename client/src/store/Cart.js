import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: null,
    totalItems: 0,
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            if (state.totalItems === 0) {
                state.items.push(action.payload);
            } else {
                const existence = state.items.find(element => element._id === action.payload._id);
                if (existence) {
                    const index = state.items.findIndex(element => element._id === action.payload._id);
                    state.items[index] = {
                        ...existence,
                        quantity: state.items[index].quantity + 1,
                    };
                } else {
                    state.items.push(action.payload);
                }
            }
            state.totalPrice += parseFloat(action.payload.price);
            ++state.totalItems;
        },
        replaceCart(state, action) {
            state.totalItems = parseInt(action.payload.totalItems, 10);
            state.items = action.payload.items.map(item => ({
                ...item,
                quantity: parseInt(item.quantity, 10),
                price: parseFloat(item.price),
            }));
            state.totalPrice = parseFloat(action.payload.totalPrice);
            if (action.payload._id) {
                state._id = action.payload._id;
                state.userId = action.payload.userId;
            }
        },
        removeFromCart(state, action) {
            const index = state.items.findIndex(element => element._id === action.payload._id);
            if (state.items[index].quantity === 1) {
                const updatedItems = state.items.filter(element => element._id !== action.payload._id);
                state.items = updatedItems;
            } else {
                --state.items[index].quantity;
            }
            --state.totalItems;
            state.totalPrice -= parseFloat(action.payload.price);
        },
        removeItem(state, action) {
            const updatedItems = state.items.filter(element => element._id !== action.payload._id);
            state.totalItems -= parseInt(action.payload.quantity, 10);
            state.totalPrice -= parseFloat(action.payload.quantity) * parseFloat(action.payload.price);
            state.items = updatedItems;
        },
    },
});

const sendData = (boughtCart) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch("http://localhost:5000/updateCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(boughtCart),
            });
            if (!response.ok) {
                throw new Error("Sending request failed.");
            }
            const result = await response.json();
            // console.log("Result of sending cart", result);
        };

        try {
            await sendRequest();
            console.log({
                status: "Complete",
                message: "Request fulfilled",
            });
        } catch (error) {
            console.log(error);
        }
    };
};

const fetchData = (getCart) => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            const response = await fetch("http://localhost:5000/getCart", {
                method: "POST",
                body: JSON.stringify(getCart),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Fetching request failed.");
            }
            const fetchedCart = await response.json();
            fetchedCart.cart.totalItems = parseInt(fetchedCart.cart.totalItems, 10);
            fetchedCart.cart.totalPrice = parseFloat(fetchedCart.cart.totalPrice);
            fetchedCart.cart.items = fetchedCart.cart.items.map(item => ({
                ...item,
                quantity: parseInt(item.quantity, 10),
                price: parseFloat(item.price),
            }));
            dispatch(cartActions.replaceCart(fetchedCart.cart));
        };

        try {
            await fetchRequest();
        } catch (error) {
            console.log(error.message);
        }
    };
};

const addToCartAndSendData = (item) => {
    return async (dispatch, getState) => {
        // Dispatch addToCart action
        dispatch(cartActions.addToCart(item));
        
        // Get the current state of the store
        const state = getState();
        const cart = state.cart; // Access the cart slice
        
        // Dispatch sendData action with the updated cart
        await dispatch(sendData(cart));
    };
};

const cartActions = cartSlice.actions;
export default cartSlice;
export { cartActions, sendData, fetchData, addToCartAndSendData };
