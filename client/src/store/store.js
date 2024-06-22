import {configureStore} from "@reduxjs/toolkit"
import SignUpSlice from "./SignUpSlice"
import ProductSlice from "./ProductSlice"
import cart from "./Cart"
import shippingInfo from './Shipping'
import orders from "./Order"

const store = configureStore({
    reducer:{
        signUp: SignUpSlice.reducer,
        products:ProductSlice.reducer,
        cart: cart.reducer,
        shippingInfo:shippingInfo.reducer,
        orders:orders.reducer
    }
})

export default store