import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    orders: []
}

const orderSlice = createSlice(
    {
        name: "orders",
        initialState,
        reducers:
        {
            placeOrder(state, action) {
                state.orders.push(action.payload)
            },
            setOrders(state, action) {
                state.orders = action.payload.orders
            },
            update(state, action) {
                const index = state.orders.findIndex(element => element._id === action.payload._id)
                state.items[index] = {
                    ...state.items[index],
                    status: action.payload.status,
                }
            },
        }
})


const orderActions = orderSlice.actions

const sendOrder = (orderData) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            console.log({
                status: "Pending",
                message: "Placing Order",
                body: JSON.stringify(orderData)
            })

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/placeOrder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Sending Request Not Fulfilled",
                    response
                })
            }
            const result = await response.json()
            console.log("result of Sending Order")
            console.log(result.id)
            
            orderActions.placeOrder(
                {
                    ...orderData,
                    id: result.id
                })

        }

        try {
            await sendRequest()

            console.log({
                status: "Complete",
                message: "Request Fulfilled"
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}


const fetchUserOrders = (id) => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            console.log("Fetching ")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/getUserOrders`, {
                method: "POST",
                body: JSON.stringify({userId:id}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Fetching Request Not Fulfilled"
                })
            }
            const fetchedCart = await response.json()
            dispatch(orderActions.setOrders({orders:fetchedCart.orders}))

            console.log("Fetched Orders")
            console.log(fetchedCart.orders)
        }

        try {
            console.log("Here We")
            await fetchRequest()
        }
        catch (error) {
            console.log(error.message)
        }
    }
}



const fetchOrders = () => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            console.log("Fetching ")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/getAllOrders`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Admin Fetching Request Not Fulfilled"
                })
            }
            const fetchedCart = await response.json()
            dispatch(orderActions.setOrders({orders:fetchedCart.orders}))

            console.log("Fetched Orders")
            console.log(fetchedCart.orders)
        }

        try {
            await fetchRequest()
        }
        catch (error) {
            console.log(error.message)
        }
    }
}



const updateOrder = (values) => {
    return async (dispatch) => {
        const updateRequest = async () => {
            console.log("Fetching ")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/updateOrderStatus`, {
                method: "post",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Admin Update Request Not Fulfilled"
                })
            }
            const fetchedCart = await response.json()


            console.log("Fetched Orders")
            console.log(fetchedCart.orders)
        }

        try {
            await updateRequest()
        }
        catch (error) {
            console.log(error.message)
        }
    }
}




export default orderSlice
export { orderActions, fetchOrders, fetchUserOrders, sendOrder, updateOrder }
