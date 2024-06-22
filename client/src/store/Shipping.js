import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    phone :"",
    country :"",
    state :"",
    city :"",
    address :"",
    pinCode :"",
}



const shippingInfo = createSlice({
    name: "shippingInfo",
    initialState,
    reducers: {
        setInfo(state,action)
        {
            [
                state.phone ,state.country ,
                state.state ,state.city ,
                state.address ,state.pinCode 
            ] = [
                action.payload.phone , action.payload.country 
                ,action.payload.state ,action.payload.city 
                ,action.payload.address ,action.payload.pinCode 
            ]
        }
    }
})



const shippingInfoActions = shippingInfo.actions
export default shippingInfo
export { shippingInfoActions}
